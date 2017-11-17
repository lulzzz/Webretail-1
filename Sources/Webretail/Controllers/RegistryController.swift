//
//  RegistryController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import PerfectHTTP
import PerfectLib

class RegistryController {
	
	private let repository: RegistryProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as RegistryProtocol
	}
	
	public func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/registry", handler: registrysHandlerGET)
		routes.add(method: .get, uri: "/api/registryfrom/{date}", handler: registrysHandlerGET)
		routes.add(method: .get, uri: "/api/registry/{id}", handler: registryHandlerGET)
		routes.add(method: .post, uri: "/api/registry", handler: registryHandlerPOST)
		routes.add(method: .put, uri: "/api/registry/{id}", handler: registryHandlerPUT)
		routes.add(method: .delete, uri: "/api/registry/{id}", handler: registryHandlerDELETE)
		
		return routes
	}
	
	func registrysHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 0 : Int(date!)!)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func registryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: Int(id)!)
			try response.setJson(item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func registryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            guard let item: Registry = request.getJson() else {
                throw PerfectError.apiError("model invalid")
            }
			try self.repository.add(item: item)
			try response.setJson(item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func registryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
            guard let item: Registry = request.getJson() else {
                throw PerfectError.apiError("model invalid")
            }
			try self.repository.update(id: Int(id)!, item: item)
			try response.setJson(item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func registryHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: Int(id)!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
