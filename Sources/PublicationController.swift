//
//  PublicationController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class PublicationController {
    
    private let repository: PublicationProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as PublicationProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/publication",        handler: publicationsHandlerGET)
        routes.add(method: .get,    uri: "/api/publication/{id}",   handler: publicationHandlerGET)
        routes.add(method: .post,   uri: "/api/publication",        handler: publicationHandlerPOST)
        routes.add(method: .put,    uri: "/api/publication/{id}",   handler: publicationHandlerPUT)
        routes.add(method: .delete, uri: "/api/publication/{id}",   handler: publicationHandlerDELETE)
        
        return routes
    }

    func publicationsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func publicationHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func publicationHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Publication()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func publicationHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Publication()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func publicationHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
}
