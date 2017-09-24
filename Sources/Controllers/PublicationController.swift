//
//  PublicationController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class PublicationController {
    
    private let repository: PublicationProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as PublicationProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/publication", handler: publicationsHandlerGET)
        routes.add(method: .get, uri: "/api/publication/{id}", handler: publicationHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}/publication", handler: publicationProductHandlerGET)
        routes.add(method: .post, uri: "/api/publication", handler: publicationHandlerPOST)
        routes.add(method: .put, uri: "/api/publication/{id}", handler: publicationHandlerPUT)
        routes.add(method: .delete, uri: "/api/publication/{id}", handler: publicationHandlerDELETE)
        
        return routes
    }

    func publicationsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            if item!.publicationId > 0 {
                try response.setJson(item)
            }
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(productId: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let item: Publication = try request.getJson()
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item: Publication = try request.getJson()
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
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
