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

class CompanyController {
	
    let uploadRoot = "./upload"
    let mediaDir = "/media"
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
            var dir = Dir(uploadRoot)
            if !dir.exists {
                try dir.create()
            }
            dir = Dir(dir.path + mediaDir)
            if !dir.exists {
                try dir.create()
            }
            dir = Dir(dir.path + csvDir)
            if !dir.exists {
                try dir.create()
            }
        } catch {
            Log.terminal(message: "The document root \(uploadRoot) could not be created.")
        }
        
        routes.add(method: .get, uri: "/media/**", handler: {
            req, resp in
            StaticFileHandler(documentRoot: self.uploadRoot, allowResponseFilters: false)
                .handleRequest(request: req, response: resp)
        })

        routes.add(method: .get, uri: "/csv/**", handler: {
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
        uploadFunc(uploadRoot + mediaDir, request, response)
    }
    
    func uploadCsvHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        uploadFunc(uploadRoot + csvDir, request, response)
    }

    fileprivate func uploadFunc(_ dir: String, _ request: HTTPRequest, _ response: HTTPResponse) {
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
                return
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
