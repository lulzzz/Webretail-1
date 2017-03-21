//
//  MyOrderController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//


import PerfectHTTP
import PerfectLogger

class MyOrderController {
	
	private let repository: MyOrderProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as MyOrderProtocol
	}
	
	public func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/myorder", handler: myOrdersHandlerGET)
		routes.add(method: .get, uri: "/api/myorder/{id}", handler: myOrderHandlerGET)
		routes.add(method: .post, uri: "/api/myorder", handler: myOrderHandlerPOST)
		routes.add(method: .put, uri: "/api/myorder/{id}", handler: myOrderHandlerPUT)
		routes.add(method: .delete, uri: "/api/myorder/{id}", handler: myOrderHandlerDELETE)
		
		return routes
	}

	func myOrdersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
	
	func myOrderHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
	
	func myOrderHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = MyOrder()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func myOrderHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = MyOrder()
			item.setJSONValues(json!)
			try self.repository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func myOrderHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
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
