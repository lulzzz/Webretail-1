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
    
    init() {
        self.repository = ioCContainer.resolve() as AttributeProtocol
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
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func attributeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
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

    func attributevalueHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.getValues(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
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
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func attributeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Attribute()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

    func attributeHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
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
