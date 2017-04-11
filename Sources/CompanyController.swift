//
//  CompanyController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import PerfectHTTP

class CompanyController {
	
	private let repository: CompanyProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CompanyProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/company", handler: companyHandlerGET)
		routes.add(method: .put, uri: "/api/company", handler: companyHandlerPUT)
		
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
}
