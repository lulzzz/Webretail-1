//
//  CustomerController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import PerfectHTTP

class CustomerController {
	
	private let repository: CustomerProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CustomerProtocol
	}
	
	public func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/customer", handler: customersHandlerGET)
		routes.add(method: .get, uri: "/api/customerfrom/{date}", handler: customersHandlerGET)
		routes.add(method: .get, uri: "/api/customer/{id}", handler: customerHandlerGET)
		routes.add(method: .post, uri: "/api/customer", handler: customerHandlerPOST)
		routes.add(method: .put, uri: "/api/customer/{id}", handler: customerHandlerPUT)
		routes.add(method: .delete, uri: "/api/customer/{id}", handler: customerHandlerDELETE)
		
		return routes
	}
	
	func customersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 0 : Int(date!)!)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func customerHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: Int(id)!)
			try response.setJson(item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func customerHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            let item: Customer = try request.getJson()
			try self.repository.add(item: item)
			try response.setJson(item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func customerHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
            let item: Customer = try request.getJson()
			try self.repository.update(id: Int(id)!, item: item)
			try response.setJson(item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func customerHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: Int(id)!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
