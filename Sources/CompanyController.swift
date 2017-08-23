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

		routes.add(method: .post, uri: "/upload/header", handler: uploadHandlerPOST)
		routes.add(method: .get, uri: "/upload/header", handler: uploadHandlerGET)
		
		return routes
	}
	
	
	func companyHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let item = try self.repository.get()
			try response.setBody(json: item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func companyHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Company()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func companyHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Company()
			item.setJSONValues(json!)
			try self.repository.update(item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func uploadHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")

		do {
			if let uploads = request.postFileUploads {
				for upload in uploads {
					try FileManager.default.moveItem(atPath: upload.tmpFileName, toPath: "/tmp/header.png")
					LogFile.info("New file header uploaded")
					response.completed(status: .created)
					return
				}
			}
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
    }

	func uploadHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		if let content = FileManager.default.contents(atPath: "/tmp/header.png") {
			response.setHeader(.contentType, value: "image/png")
			response.setBody(bytes: [UInt8](content))
			response.completed(status: .ok)
		}
		response.badRequest(error: "\(request.uri) \(request.method): Header file not found")
    }
}
