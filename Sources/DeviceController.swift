//
//  DeviceController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//
import PerfectHTTP

class DeviceController {
	
	private let repository: DeviceProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as DeviceProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/device", handler: devicesHandlerGET)
		routes.add(method: .get, uri: "/api/devicefrom/{date}", handler: devicesHandlerGET)
		routes.add(method: .get, uri: "/api/device/{id}", handler: deviceHandlerGET)
		routes.add(method: .post, uri: "/api/device", handler: deviceHandlerPOST)
		routes.add(method: .put, uri: "/api/device/{id}", handler: deviceHandlerPUT)
		routes.add(method: .delete, uri: "/api/device/{id}", handler: deviceHandlerDELETE)
		
		return routes
	}
	
	func devicesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 0 : Int(date!)!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func deviceHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let item = try self.repository.get(id: Int(id)!)
			try response.setBody(json: item)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func deviceHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Device()
			item.setJSONValues(json!)
			try self.repository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func deviceHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Device()
			item.setJSONValues(json!)
			try self.repository.update(id: Int(id)!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func deviceHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.delete(id: Int(id)!)
			response.completed(status: .noContent)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}
