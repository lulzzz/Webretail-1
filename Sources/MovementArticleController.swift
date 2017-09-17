//
//  MovementArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP

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
        
        do {
			let id = request.urlVariables["id"]!
            let items = try self.movementRepository.get(movementId: Int(id)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementArticleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
       	do {
            let item: MovementArticle = try request.getJson()
            guard let product = try item.getProduct(barcode: item.movementArticleBarcode) else {
                response.completed(status: .notFound)
                return
            }
			item.movementArticleProduct = product

			let price = request.urlVariables["price"]!
			if price == "selling" {
                item.movementArticlePrice = product._discount != nil ? product._discount!.discountPrice : product.productSellingPrice
			}
			if price == "purchase" {
				item.movementArticlePrice = product.productPurchasePrice
			}
			
			try self.movementRepository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementArticleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]!
            let item: MovementArticle = try request.getJson()
            try self.movementRepository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementArticleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]!
            try self.movementRepository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
