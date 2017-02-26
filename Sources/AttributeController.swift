//
//  AttributeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class AttributeController {
    
    private let repository: AttributeProtocol
    
    init(repository: AttributeProtocol) {
        
        self.repository = repository
        
        let attribute = Attribute()
        try? attribute.setup()
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/attribute",              handler: attributesHandlerGET)
        routes.add(method: .get,    uri: "/api/attribute/{id}",         handler: attributeHandlerGET)
        routes.add(method: .get,    uri: "/api/attribute/{id}/value",   handler: attributevalueHandlerGET)
        routes.add(method: .post,   uri: "/api/attribute",              handler: attributeHandlerPOST)
        routes.add(method: .put,    uri: "/api/attribute/{id}",         handler: attributeHandlerPUT)
        routes.add(method: .delete, uri: "/api/attribute/{id}",         handler: attributeHandlerDELETE)
        
        return routes
    }

    func attributesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/attribute .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func attributeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/attribute/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributevalueHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.getValues(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/attribute/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Attribute()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/attribute .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Attribute()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/attribute/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributeHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/attribute/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
}
