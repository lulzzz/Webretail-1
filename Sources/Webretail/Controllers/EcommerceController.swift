//
//  EcommerceController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

import PerfectHTTP

class EcommerceController {
    
    private let repository: EcommerceProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as EcommerceProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        /// Public Api
        routes.add(method: .get, uri: "/api/ecommerce", handler: ecommerceHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/category", handler: ecommerceCategoriesHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/featured", handler: ecommerceFeaturedHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/category/{id}", handler: ecommerceCategoryHandlerGET)
        
        /// Customer Api
        routes.add(method: .get, uri: "/api/ecommerce/customer", handler: ecommerceCustomerHandlerGET)
        routes.add(method: .put, uri: "/api/ecommerce/customer", handler: ecommerceCustomerHandlerPUT)
        routes.add(method: .delete, uri: "/api/ecommerce/customer", handler: ecommerceCustomerHandlerDELETE)

        routes.add(method: .get, uri: "/api/ecommerce/basket", handler: ecommerceBasketHandlerGET)
        routes.add(method: .post, uri: "/api/ecommerce/basket", handler: ecommerceBasketHandlerPOST)
        routes.add(method: .put, uri: "/api/ecommerce/basket/{id}", handler: ecommerceBasketHandlerPUT)
        routes.add(method: .delete, uri: "/api/ecommerce/basket/{id}", handler: ecommerceBasketHandlerDELETE)

        routes.add(method: .get, uri: "/api/ecommerce/order", handler: ecommerceOrderHandlerGET)
        routes.add(method: .post, uri: "/api/ecommerce/order", handler: ecommerceOrderHandlerPOST)
        
        return routes
    }

    /// Public Api

    func ecommerceHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getPublished()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceCategoriesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getCategories()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceFeaturedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getFeatured()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceCategoryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let items = try self.repository.getPublished(categoryId: Int(id)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    /// Customer Api

    func ecommerceCustomerHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceCustomerHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceCustomerHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }

    func ecommerceBasketHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceBasketHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceBasketHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceBasketHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }

    func ecommerceOrderHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
    func ecommerceOrderHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
    }
}

