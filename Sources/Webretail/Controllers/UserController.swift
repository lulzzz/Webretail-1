//
//  AccountController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import PerfectHTTP

class UserController {
    
    private let repository: UserProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as UserProtocol
    }
    
    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/account", handler: accountsHandlerGET)
        routes.add(method: .get, uri: "/api/account/{id}", handler: accountHandlerGET)
        routes.add(method: .post, uri: "/api/account", handler: accountHandlerPOST)
        routes.add(method: .put, uri: "/api/account/{id}", handler: accountHandlerPUT)
        routes.add(method: .delete, uri: "/api/account/{id}", handler: accountHandlerDELETE)
        
        return routes
    }

   func accountsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func accountHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func accountHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: User = try request.getJson()
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func accountHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: User = try request.getJson()
            try self.repository.update(id: id, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func accountHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
