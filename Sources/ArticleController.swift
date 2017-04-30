//
//  ArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class ArticleController {
    
    private let repository: ArticleProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as ArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/product/{id}/build", handler: articleBuildHandlerGET)
        routes.add(method: .get, uri: "/api/article", handler: articlesHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}/store/{storeids}", handler: productArticleHandlerGET)
        routes.add(method: .get, uri: "/api/article/{id}", handler: articleHandlerGET)
        routes.add(method: .post, uri: "/api/article", handler: articleHandlerPOST)
        routes.add(method: .put, uri: "/api/article/{id}", handler: articleHandlerPUT)
        routes.add(method: .delete, uri: "/api/article/{id}", handler: articleHandlerDELETE)
        routes.add(method: .post, uri: "/api/articleattributevalue", handler: articleAttributeValueHandlerPOST)
        routes.add(method: .delete, uri: "/api/articleattributevalue/{id}", handler: articleAttributeValueHandlerDELETE)
        
        return routes
    }
    
    func articleBuildHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let count = try self.repository.build(productId: id.toInt()!)
            try response.setBody(json: count)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articlesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productArticleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
		let storeIds = request.urlVariables["storeids"]!
		do {
            let item = try self.repository.getStock(productId: id.toInt()!, storeIds: storeIds)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as! [String: AnyObject]
            let item = Article()
            item.setJSONValues(json)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as! [String: Any]
            let item = Article()
            item.setJSONValues(json)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as! [String: Any]
            let item = ArticleAttributeValue()
            item.setJSONValues(json)
            try self.repository.addAttributeValue(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleAttributeValueHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.removeAttributeValue(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
