//
//  CompanyController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import Foundation
import PerfectHTTP

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

		//routes.add(method: .post, uri: "/upload/header", handler: uploadHandlerPOST)
		//routes.add(method: .get, uri: "/upload/header", handler: uploadHandlerGET)
		
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

    /*
	func uploadHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            if let dir = NSSearchPathForDirectoriesInDomains(FileManager.SearchPathDirectory.downloadsDirectory, FileManager.SearchPathDomainMask.allDomainsMask, true).first {
                for multipart in r.parseMultiPartFormData() {
                    FileManager.default.createFile(atPath: dir.appending("/backup/header.png"), contents: Data(bytes: multipart.body), attributes: nil)
                    LogFile.info("New file header uploaded")
                }
            }
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
    }

	func uploadHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            if let dir = NSSearchPathForDirectoriesInDomains(FileManager.SearchPathDirectory.downloadsDirectory, FileManager.SearchPathDomainMask.allDomainsMask, true).first {
                if let content = FileManager.default.contents(atPath: dir.appending("/backup/header.png")) {
                    return .raw(200, "OK", ["Content-Type": "image/png"], { writer in
                        try? writer.write(content)
                    })
                }
            }
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
    }
    */
}
