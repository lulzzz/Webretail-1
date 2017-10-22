//
//  DiscountController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import PerfectHTTP

class DiscountController {
	
	private let repository: DiscountProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as DiscountProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/discount", handler: discountsHandlerGET)
		routes.add(method: .get, uri: "/api/discount/{id}", handler: discountHandlerGET)
		routes.add(method: .get, uri: "/api/discount/{id}/product", handler: discountProductHandlerGET)
		routes.add(method: .post, uri: "/api/discount", handler: discountHandlerPOST)
		routes.add(method: .put, uri: "/api/discount/{id}", handler: discountHandlerPUT)
		routes.add(method: .delete, uri: "/api/discount/{id}", handler: discountHandlerDELETE)
		routes.add(method: .post, uri: "/api/discountproduct", handler: discountProductHandlerPOST)
		routes.add(method: .delete, uri: "/api/discountproduct/{id}", handler: discountProductHandlerDELETE)
		
		return routes
	}
	
	func discountsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let items = try self.repository.getAll()
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func discountHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: Int(id)!)
			try response.setJson(item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func discountProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let items = try self.repository.getProducts(id: Int(id)!)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func discountHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
            let item: Discount = try request.getJson()
			try self.repository.add(item: item)
			try response.setJson(item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func discountHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
            let item: Discount = try request.getJson()
			try self.repository.update(id: Int(id)!, item: item)
			try response.setJson(item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func discountHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: Int(id)!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func discountProductHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let item: DiscountProduct = try request.getJson()
            try self.repository.addProduct(item: item)
			try response.setJson(item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func discountProductHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.removeProduct(id: Int(id)!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
