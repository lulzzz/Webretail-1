//
//  AttributeValueController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger


class AttributeValueController {
    
    private let repository: AttributeValueProtocol
    
    init(repository: AttributeValueProtocol) {
        
        self.repository = repository
        
        let attributeValue = AttributeValue()
        try? attributeValue.setup()
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/attributevalue",         handler: attributevaluesHandlerGET)
        routes.add(method: .get,    uri: "/api/attributevalue/{id}",    handler: attributevalueHandlerGET)
        routes.add(method: .post,   uri: "/api/attributevalue",         handler: attributevalueHandlerPOST)
        routes.add(method: .put,    uri: "/api/attributevalue/{id}",    handler: attributevalueHandlerPUT)
        routes.add(method: .delete, uri: "/api/attributevalue/{id}",    handler: attributevalueHandlerDELETE)
        
        return routes
    }

    func attributevaluesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/attributevalue .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func attributevalueHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/attributevalue/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributevalueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = AttributeValue()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/attributevalue .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributevalueHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = AttributeValue()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/attributevalue/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func attributevalueHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            response.completed(status: HTTPResponseStatus.badRequest)
            LogFile.error("/api/attributevalue/\(id) .delete: \(error)", logFile: "./error.log")
        }
    }
}
