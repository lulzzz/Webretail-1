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
		let date = request.urlVariables["date"]
        do {
			let items = try self.repository.getAll(date: date == nil ? 0 : Int(date!)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Causal = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: Causal = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func causalHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
