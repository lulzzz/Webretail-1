//
//  SyncronizeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 20/04/17.
//
//

import PerfectHTTP

class SyncronizeController {
	
	private let repository: SyncronizeProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as SyncronizeProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/syncronize/causal/{date}", handler: causalsHandlerGET)
		routes.add(method: .get, uri: "/api/syncronize/customer/{date}", handler: customersHandlerGET)
		routes.add(method: .get, uri: "/api/syncronize/product/{date}", handler: productsHandlerGET)
		
		return routes
	}
	
	func causalsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let date = request.urlVariables["date"]!
		do {
			let items = try self.repository.getCausals(date: date.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func customersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let date = request.urlVariables["date"]!
		do {
			let items = try self.repository.getCustomers(date: date.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func productsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let date = request.urlVariables["date"]!
		do {
			let items = try self.repository.getProducts(date: date.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
