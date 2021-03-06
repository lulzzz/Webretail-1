//
//  StoreController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 27/02/17.
//
//

import PerfectHTTP

class StoreController {
    
    private let repository: StoreProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as StoreProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/store", handler: storesHandlerGET)
        routes.add(method: .get, uri: "/api/store/{id}", handler: storeHandlerGET)
        routes.add(method: .post, uri: "/api/store", handler: storeHandlerPOST)
        routes.add(method: .put, uri: "/api/store/{id}", handler: storeHandlerPUT)
        routes.add(method: .delete, uri: "/api/store/{id}", handler: storeHandlerDELETE)
        
        return routes
    }
    
    func storesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func storeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func storeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Store = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func storeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: Store = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func storeHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
