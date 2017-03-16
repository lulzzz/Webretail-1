//
//  OrderController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import PerfectHTTP
import PerfectLogger

class OrderController {
	
	private let repository: OrderProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as OrderProtocol
	}
	
	public func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/orderstatus", handler: orderStatusHandlerGET)
		routes.add(method: .get, uri: "/api/order", handler: ordersHandlerGET)
		routes.add(method: .get, uri: "/api/order/{id}", handler: orderHandlerGET)
		routes.add(method: .post, uri: "/api/order", handler: orderHandlerPOST)
		routes.add(method: .put, uri: "/api/order/{id}", handler: orderHandlerPUT)
		routes.add(method: .delete, uri: "/api/order/{id}", handler: orderHandlerDELETE)
		
		return routes
	}

	func orderStatusHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let status = self.repository.getStatus()
			try response.setBody(json: status)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}

	func ordersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let items = try self.repository.getAll()
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: id.toInt()!)
			try response.setBody(json: item)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Order()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Order()
			item.setJSONValues(json!)
			try self.repository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
}
