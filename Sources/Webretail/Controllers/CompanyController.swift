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

class CompanyController {
	
    let mediaRoot = "./Upload"
    let mediaDir = "./Upload/Media"
    
    private let repository: CompanyProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CompanyProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/company", handler: companyHandlerGET)
		routes.add(method: .post, uri: "/api/company", handler: companyHandlerPOST)
		routes.add(method: .put, uri: "/api/company", handler: companyHandlerPUT)
		routes.add(method: .post, uri: "/api/media", handler: uploadHandlerPOST)
		
        do {
            var dir = Dir(mediaRoot)
            if !dir.exists {
                try dir.create()
            }
            dir = Dir(mediaDir)
            if !dir.exists {
                try dir.create()
            }
        } catch {
            Log.terminal(message: "The document root \(mediaRoot) could not be created.")
        }
        
        routes.add(method: .get, uri: "/Media/**", handler: {
            req, resp in
            StaticFileHandler(documentRoot: self.mediaRoot, allowResponseFilters: false)
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

	func uploadHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {

			if let uploads = request.postFileUploads {
                for upload in uploads {
                    let path = "\(mediaDir)/\(upload.fileName)"
                    if (FileManager.default.fileExists(atPath: path)) {
                        try FileManager.default.removeItem(atPath: path)
                    }
					try FileManager.default.moveItem(atPath: upload.tmpFileName, toPath: "\(mediaDir)/\(upload.fileName)")
					LogFile.info("Uploaded file \(upload.fileName)")
				}
                response.completed(status: .created)
                return
			}
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
    }
}
