//
//  ArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class ArticleController {
    
    private let repository: ArticleProtocol
    
    init(repository: ArticleProtocol) {
        
        self.repository = repository
        
        let article = Article()
        try? article.setup()
        
        let articleAttributeValue = ArticleAttributeValue()
        try? articleAttributeValue.setup()
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/product/{id}/build",         handler: articleBuildHandlerGET)
        routes.add(method: .get,    uri: "/api/article",                    handler: articlesHandlerGET)
        routes.add(method: .get,    uri: "/api/product/{id}/article",       handler: productArticleHandlerGET)
        routes.add(method: .get,    uri: "/api/article/{id}",               handler: articleHandlerGET)
        routes.add(method: .post,   uri: "/api/article",                    handler: articleHandlerPOST)
        routes.add(method: .put,    uri: "/api/article/{id}",               handler: articleHandlerPUT)
        routes.add(method: .delete, uri: "/api/article/{id}",               handler: articleHandlerDELETE)
        routes.add(method: .post,   uri: "/api/articleattributevalue",      handler: articleAttributeValueHandlerPOST)
        routes.add(method: .delete, uri: "/api/articleattributevalue/{id}", handler: articleAttributeValueHandlerDELETE)
        
        return routes
    }

    func articleBuildHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let count = try self.repository.build(productId: id!)
            try response.setBody(json: count)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/product/\(id)/build .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func articlesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/article .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productArticleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(productId: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/product/\(id)/article .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/article/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Article()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/article .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Article()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/article/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/article/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = ArticleAttributeValue()
            item.setJSONValues(json!)
            try self.repository.addAttributeValue(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/articleattributevalue .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func articleAttributeValueHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.removeAttributeValue(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/articleattributevalue/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
}
