//
//  CausalController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP

class CausalController {
    
    private let repository: CausalProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as CausalProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/causal", handler: causalsHandlerGET)
		routes.add(method: .get, uri: "/api/causalfrom/{date}", handler: causalsHandlerGET)
        routes.add(method: .get, uri: "/api/causal/{id}", handler: causalHandlerGET)
        routes.add(method: .post, uri: "/api/causal", handler: causalHandlerPOST)
        routes.add(method: .put, uri: "/api/causal/{id}", handler: causalHandlerPUT)
        routes.add(method: .delete, uri: "/api/causal/{id}", handler: causalHandlerDELETE)
        
        return routes
    }
    
    func causalsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
    
    func causalHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
    
    func causalHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Causal()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Causal()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
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
