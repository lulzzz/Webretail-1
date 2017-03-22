//
//  MovementArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP
import PerfectLogger

class MovementArticleController {
    
    private let movementRepository: MovementArticleProtocol
    private let productRepository: ProductProtocol
    
    init() {
        self.movementRepository = ioCContainer.resolve() as MovementArticleProtocol
        self.productRepository = ioCContainer.resolve() as ProductProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/movementarticle/{id}", handler: movementArticlesHandlerGET)
        routes.add(method: .post, uri: "/api/movementarticle/{price}", handler: movementArticleHandlerPOST)
        routes.add(method: .put, uri: "/api/movementarticle/{id}", handler: movementArticleHandlerPUT)
        routes.add(method: .delete, uri: "/api/movementarticle/{id}", handler: movementArticleHandlerDELETE)
        
        return routes
    }
    
    func movementArticlesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let items = try self.movementRepository.get(movementId: id.toInt()!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func movementArticleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
		let price = request.urlVariables["price"]!
       	do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = MovementArticle()
            item.setJSONValues(json!)
            guard let product = try self.productRepository.get(barcode: item.barcode) else {
                response.completed(status: .notFound)
                return
            }
			item.product = try product.getJSONValues()
			if price == "selling" {
				item.price = product.sellingPrice
			}
			if price == "purchase" {
				item.price = product.purchasePrice
			}
			try self.movementRepository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func movementArticleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = MovementArticle()
            item.setJSONValues(json!)
            try self.movementRepository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func movementArticleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.movementRepository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
}
