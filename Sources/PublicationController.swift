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
    
    init(repository: PublicationProtocol) {
        
        self.repository = repository
        
        let publication = Publication()
        try? publication.setup()
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
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/publication .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func publicationHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/publication/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
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
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/publication .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func publicationHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Publication()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/publication/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func publicationHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/publication/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
}
