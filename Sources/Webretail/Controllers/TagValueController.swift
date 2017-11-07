//
//  TagValueController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import PerfectHTTP

class TagValueController {
    
    private let repository: TagValueProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as TagValueProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/tagvalue", handler: tagvaluesHandlerGET)
        routes.add(method: .get, uri: "/api/tagvalue/{id}", handler: tagvalueHandlerGET)
        routes.add(method: .post, uri: "/api/tagvalue", handler: tagvalueHandlerPOST)
        routes.add(method: .put, uri: "/api/tagvalue/{id}", handler: tagvalueHandlerPUT)
        routes.add(method: .delete, uri: "/api/tagvalue/{id}", handler: tagvalueHandlerDELETE)
        
        return routes
    }
    
    func tagvaluesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagvalueHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagvalueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: TagValue = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagvalueHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: TagValue = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagvalueHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}

