//
//  MovementArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP
import PerfectLogger

class MovementArticleController {
    
    private let repository: MovementArticleProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as MovementArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/movementarticle",      handler: movementsHandlerGET)
        routes.add(method: .get,    uri: "/api/movementarticle/{id}", handler: movementHandlerGET)
        routes.add(method: .post,   uri: "/api/movementarticle",      handler: movementHandlerPOST)
        routes.add(method: .put,    uri: "/api/movementarticle/{id}", handler: movementHandlerPUT)
        routes.add(method: .delete, uri: "/api/movementarticle/{id}", handler: movementHandlerDELETE)
        
        return routes
    }
    
    func movementsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = MovementArticle()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = MovementArticle()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
}
