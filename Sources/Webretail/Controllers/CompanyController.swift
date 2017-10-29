//
//  CompanyController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import Foundation
import PerfectHTTP
import PerfectLogger

class CompanyController {
	
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
            let pathDir = "./webroot/Media"
            var isDir : ObjCBool = true
            if (!FileManager.default.fileExists(atPath: pathDir, isDirectory: &isDir)) {
                try FileManager.default.createDirectory(atPath: pathDir, withIntermediateDirectories: false, attributes: nil)
            }
            
			if let uploads = request.postFileUploads {
                for upload in uploads {
                    let path = "\(pathDir)/\(upload.fileName)"
                    if (FileManager.default.fileExists(atPath: path)) {
                        try FileManager.default.removeItem(atPath: path)
                    }
					try FileManager.default.moveItem(atPath: upload.tmpFileName, toPath: "\(pathDir)/\(upload.fileName)")
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
