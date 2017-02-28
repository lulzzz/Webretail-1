//
//  CategoryController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class CategoryController {
    
    private let repository: CategoryProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as CategoryProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/category",       handler: categoriesHandlerGET)
        routes.add(method: .get,    uri: "/api/category/{id}",  handler: categoryHandlerGET)
        routes.add(method: .post,   uri: "/api/category",       handler: categoryHandlerPOST)
        routes.add(method: .put,    uri: "/api/category/{id}",  handler: categoryHandlerPUT)
        routes.add(method: .delete, uri: "/api/category/{id}",  handler: categoryHandlerDELETE)
        
        return routes
    }

    func categoriesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("/api/category .get: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
    
    func categoryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("/api/category/\(id) .get: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func categoryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Category()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("/api/category .post: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func categoryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Category()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("/api/category/\(id) .put: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func categoryHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("/api/category/\(id) .delete: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
}
