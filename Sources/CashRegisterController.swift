//
//  CashRegisterController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import PerfectHTTP

class CashRegisterController {
	
	private let repository: CashRegisterProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CashRegisterProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/cashregister", handler: cashRegistersHandlerGET)
		routes.add(method: .get, uri: "/api/cashregisterfrom/{date}", handler: cashRegistersHandlerGET)
		routes.add(method: .get, uri: "/api/cashregister/{id}", handler: cashRegisterHandlerGET)
		routes.add(method: .post, uri: "/api/cashregister", handler: cashRegisterHandlerPOST)
		routes.add(method: .put, uri: "/api/cashregister/{id}", handler: cashRegisterHandlerPUT)
		routes.add(method: .delete, uri: "/api/cashregister/{id}", handler: cashRegisterHandlerDELETE)
		
		return routes
	}
	
	func cashRegistersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 1 : date!.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func cashRegisterHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
	
	func cashRegisterHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = CashRegister()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func cashRegisterHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = CashRegister()
			item.setJSONValues(json!)
			try self.repository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func cashRegisterHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
