//
//  InvoiceController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 05/04/17.
//
//

import PerfectHTTP

class InvoiceController {
	
	private let repository: InvoiceProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as InvoiceProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/invoice", handler: invoicesHandlerGET)
		routes.add(method: .get, uri: "/api/invoice/{id}", handler: invoiceHandlerGET)
		routes.add(method: .post, uri: "/api/invoice", handler: invoiceHandlerPOST)
		routes.add(method: .put, uri: "/api/invoice/{id}", handler: invoiceHandlerPUT)
		routes.add(method: .delete, uri: "/api/invoice/{id}", handler: invoiceHandlerDELETE)
		routes.add(method: .post, uri: "/api/invoicemovement/{id}/{invoiceId}", handler: invoiceMovementHandlerPOST)
		routes.add(method: .delete, uri: "/api/invoicemovement/{id}", handler: invoiceMovementHandlerDELETE)
		
		return routes
	}
	
	func invoicesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let items = try self.repository.getAll()
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: id.toInt()!)
			try response.setBody(json: item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Invoice()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Invoice()
			item.setJSONValues(json!)
			try self.repository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceMovementHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		let invoiceId = request.urlVariables["invoiceId"]!
		do {
			try self.repository.addMovement(id: id.toInt()!, invoiceId: invoiceId.toInt()!)
			try response.setBody(json: id)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func invoiceMovementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.removeMovement(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
