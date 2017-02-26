//
//  AccountController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class UserController {
    
    private let repository: UserProtocol
    
    init(repository: UserProtocol) {
        
        self.repository = repository
    }
    
    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/account",        handler: accountsHandlerGET)
        routes.add(method: .get,    uri: "/api/account/{id}",   handler: accountHandlerGET)
        routes.add(method: .post,   uri: "/api/account",        handler: accountHandlerPOST)
        routes.add(method: .put,    uri: "/api/account/{id}",   handler: accountHandlerPUT)
        routes.add(method: .delete, uri: "/api/account/{id}",   handler: accountHandlerDELETE)
        
        return routes
    }

    func accountsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/account .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func accountHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/account/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func accountHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = User()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/account .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func accountHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = User()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/account/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func accountHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/account/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
}
