//
//  StoreController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 27/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class StoreController {
    
    private let repository: StoreProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as StoreProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/store",      handler: storesHandlerGET)
        routes.add(method: .get,    uri: "/api/store/{id}", handler: storeHandlerGET)
        routes.add(method: .post,   uri: "/api/store",      handler: storeHandlerPOST)
        routes.add(method: .put,    uri: "/api/store/{id}", handler: storeHandlerPUT)
        routes.add(method: .delete, uri: "/api/store/{id}", handler: storeHandlerDELETE)
        
        return routes
    }
    
    func storesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
    
    func storeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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
    
    func storeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Store()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func storeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Store()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func storeHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
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
