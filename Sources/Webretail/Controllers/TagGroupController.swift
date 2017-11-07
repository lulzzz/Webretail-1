//
//  TagController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import PerfectLib
import PerfectHTTP

class TagGroupController {
    
    private let repository: TagGroupProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as TagGroupProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/tag", handler: tagsHandlerGET)
        routes.add(method: .get, uri: "/api/tag/{id}", handler: tagHandlerGET)
        routes.add(method: .get, uri: "/api/tag/{id}/value", handler: tagValueHandlerGET)
        routes.add(method: .post, uri: "/api/tag", handler: tagHandlerPOST)
        routes.add(method: .put, uri: "/api/tag/{id}", handler: tagHandlerPUT)
        routes.add(method: .delete, uri: "/api/tag/{id}", handler: tagHandlerDELETE)
        
        return routes
    }
    
    func tagsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagAllHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            for item in items {
                item._values = try self.repository.getValues(id: item.tagGroupId)
            }
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func tagHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            if id == "all" {
                let items = try self.repository.getAll()
                for item in items {
                    item._values = try self.repository.getValues(id: item.tagGroupId)
                }
                try response.setJson(items)
            } else {
                let item = try self.repository.get(id: Int(id)!)
                try response.setJson(item)
            }
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagValueHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.getValues(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: TagGroup = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: TagGroup = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func tagHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}

