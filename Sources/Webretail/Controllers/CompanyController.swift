//
//  CompanyController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import Foundation
import PerfectHTTP
import PerfectLib
import PerfectLogger
import PerfectSMTP
import SwiftGD

class CompanyController {
	
    let uploadRoot = "./upload"
    let mediaDir = "/media"
    let thumbDir = "/thumb"
    let csvDir = "/csv"

    private let repository: CompanyProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CompanyProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/company", handler: companyHandlerGET)
		routes.add(method: .post, uri: "/api/company", handler: companyHandlerPOST)
		routes.add(method: .put, uri: "/api/company", handler: companyHandlerPUT)
		routes.add(method: .post, uri: "/api/media", handler: uploadMediaHandlerPOST)
        routes.add(method: .post, uri: "/api/csv", handler: uploadCsvHandlerPOST)
        routes.add(method: .post, uri: "/api/email", handler: emailHandlerPOST)

        do {
            let dir = Dir(uploadRoot)
            if !dir.exists {
                try dir.create()
            }
            let dirMedia = Dir(dir.path + mediaDir)
            if !dirMedia.exists {
                try dirMedia.create()
            }
            let dirThumb = Dir(dir.path + thumbDir)
            if !dirThumb.exists {
                try dirThumb.create()
            }
            let dirCsv = Dir(dir.path + csvDir)
            if !dirCsv.exists {
                try dirCsv.create()
            }
        } catch {
            Log.terminal(message: "The document root \(uploadRoot) could not be created.")
        }
        
        routes.add(method: .get, uri: mediaDir + "/**", handler: {
            req, resp in
            StaticFileHandler(documentRoot: self.uploadRoot, allowResponseFilters: false)
                .handleRequest(request: req, response: resp)
        })

        routes.add(method: .get, uri: thumbDir + "/**", handler: {
            req, resp in
            StaticFileHandler(documentRoot: self.uploadRoot, allowResponseFilters: false)
                .handleRequest(request: req, response: resp)
        })

        routes.add(method: .get, uri: csvDir + "/**", handler: {
            req, resp in
            StaticFileHandler(documentRoot: self.uploadRoot, allowResponseFilters: false)
                .handleRequest(request: req, response: resp)
        })

        return routes
	}
	
	func companyHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let item = try self.repository.get()
			try response.setJson(item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func companyHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let item: Company = request.getJson()!
			try self.repository.add(item: item)
			try response.setJson(item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func companyHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            let item: Company = request.getJson()!
            try self.repository.update(item: item)
			try response.setJson(item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
    
    func uploadMediaHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            if let uploads = request.postFileUploads {
                var medias = [Media]()
                for upload in uploads {

                    let media = Media()
                    media.name = upload.fileName.uniqueName()
                    media.contentType = upload.contentType
                    medias.append(media)
                                        
                    let toMedia = "\(uploadRoot + mediaDir)/\(media.name)"
                    let toThumb = URL(fileURLWithPath: "\(uploadRoot + thumbDir)/\(media.name)")
                    
                    try FileManager.default.moveItem(atPath: upload.tmpFileName, toPath: toMedia)

                    let image = Image(url: URL(fileURLWithPath: toMedia))
                    let thumb = image!.resizedTo(width: 480)
                    thumb!.write(to: toThumb)
                    
                    LogFile.info("Uploaded file \(upload.fileName) => \(media.name)")
                }
                try response.setJson(medias)
                response.completed(status: .created)
            }
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func uploadCsvHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        let dir = uploadRoot + csvDir
        do {
            if let uploads = request.postFileUploads {
                for upload in uploads {
                    let path = "\(dir)/\(upload.fileName)"
                    if (FileManager.default.fileExists(atPath: path)) {
                        try FileManager.default.removeItem(atPath: path)
                    }
                    try FileManager.default.moveItem(atPath: upload.tmpFileName, toPath: "\(dir)/\(upload.fileName)")
                    LogFile.info("Uploaded file \(upload.fileName)")
                }
                response.completed(status: .created)
            }
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func emailHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: PdfDocument = request.getJson()!
            if item.address.isEmpty {
                throw PerfectError.apiError("email address to is empty")
            }
            
            let company = try self.repository.get()!
            if company.companyEmailInfo.isEmpty {
                throw PerfectError.apiError("email address from is empty")
            }
            
            let url = "\(company.smtpSsl ? "smtps" : "smtp")://\(company.smtpHost)"
            let client = SMTPClient(url: url, username: company.smtpUsername, password: company.smtpPassword)
            let email = EMail(client: client)
            
            email.to.append(Recipient(address: item.address))
            email.from = Recipient(address: company.companyEmailInfo)
            email.subject = item.subject
            email.content = item.content
            
            try email.send() { code, header, body in
                
                if code != 0 {
                    response.badRequest(error: "\(request.uri) \(request.method): \(header)")
                    return
                }
                
                do {
                    item.content = "Email successfully sent"
                    try response.setJson(item)
                    response.completed(status: .accepted)
                } catch {
                    print(error)
                }
            }
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
