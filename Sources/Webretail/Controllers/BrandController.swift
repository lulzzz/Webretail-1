//
//  BrandController.swift
//  PerfectTurnstilePostgreSQLDemo
//
//  Created by Gerardo Grisolini on 16/02/17.
//
//

import Foundation
import PerfectHTTP

class BrandController {
    
    private let repository: BrandProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as BrandProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/brand", handler: brandsHandlerGET)
        routes.add(method: .get, uri: "/api/brand/{id}", handler: brandHandlerGET)
        routes.add(method: .post, uri: "/api/brand", handler: brandHandlerPOST)
        routes.add(method: .put, uri: "/api/brand/{id}", handler: brandHandlerPUT)
        routes.add(method: .delete, uri: "/api/brand/{id}", handler: brandHandlerDELETE)
        
        return routes
    }

    func brandsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func brandHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func brandHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Brand = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func brandHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: Brand = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func brandHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
