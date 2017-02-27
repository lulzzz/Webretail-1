//
//  BrandController.swift
//  PerfectTurnstilePostgreSQLDemo
//
//  Created by Gerardo Grisolini on 16/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class BrandController {
    
    private let repository: BrandProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as BrandProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/brand",      handler: brandsHandlerGET)
        routes.add(method: .get,    uri: "/api/brand/{id}", handler: brandHandlerGET)
        routes.add(method: .post,   uri: "/api/brand",      handler: brandHandlerPOST)
        routes.add(method: .put,    uri: "/api/brand/{id}", handler: brandHandlerPUT)
        routes.add(method: .delete, uri: "/api/brand/{id}", handler: brandHandlerDELETE)
        
        return routes
    }

    func brandsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("/api/brand .get: \(error)", logFile: "./error.log")
            response.completed(status: .badRequest)
        }
    }
    
    func brandHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("/api/brand/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: .badRequest)
        }
    }

    func brandHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Brand()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("/api/brand .post: \(error)", logFile: "./error.log")
            response.completed(status: .badRequest)
        }
    }

    func brandHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Brand()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("/api/brand/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: .badRequest)
        }
    }

    func brandHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("/api/brand/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: .badRequest)
        }
    }
}
