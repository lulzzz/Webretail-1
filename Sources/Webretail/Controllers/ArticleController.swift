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
        routes.add(method: .get, uri: "/api/product/{id}/article", handler: productArticleHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}/group", handler: articleGroupHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}/store/{storeids}", handler: articleStockHandlerGET)
        
        routes.add(method: .post, uri: "/api/article", handler: articleHandlerPOST)
        routes.add(method: .get, uri: "/api/article/{id}", handler: articleHandlerGET)
        routes.add(method: .put, uri: "/api/article/{id}", handler: articleHandlerPUT)
        routes.add(method: .delete, uri: "/api/article/{id}", handler: articleHandlerDELETE)
        routes.add(method: .post, uri: "/api/articleattributevalue", handler: articleAttributeValueHandlerPOST)
        routes.add(method: .delete, uri: "/api/articleattributevalue/{id}", handler: articleAttributeValueHandlerDELETE)
        
        return routes
    }
    
    func articleBuildHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let count = try self.repository.build(productId: Int(id)!)
            try response.setBody(json: count)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleGroupHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let items = try self.repository.getGrouped(productId: Int(id)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productArticleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(productId: Int(id)!, storeIds: "0")
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleStockHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
		let storeIds = request.urlVariables["storeids"]!
		do {
            let item = try self.repository.getStock(productId: Int(id)!, storeIds: storeIds)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Article = request.getJson()!
            let group = try self.repository.addGroup(item: item)
            try response.setJson(group)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item: Article = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: ArticleAttributeValue = request.getJson()!
            try self.repository.addAttributeValue(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func articleAttributeValueHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            try self.repository.removeAttributeValue(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
