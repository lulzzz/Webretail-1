//
//  EcommerceController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

import PerfectHTTP
import PerfectLib

class EcommerceController {
    
    private let repository: EcommerceProtocol
    private let customerRepository: CustomerProtocol

    init() {
        self.repository = ioCContainer.resolve() as EcommerceProtocol
        self.customerRepository = ioCContainer.resolve() as CustomerProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        /// Guest Api
        routes.add(method: .get, uri: "/api/ecommerce", handler: ecommerceHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/featured", handler: ecommerceFeaturedHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/category", handler: ecommerceCategoriesHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/category/{id}", handler: ecommerceCategoryHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/product/{id}", handler: ecommerceProductHandlerGET)

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

    
    /// Products

    func ecommerceHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getPublished()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceCategoriesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getCategories()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceFeaturedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getFeatured()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceCategoryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let id = Int(request.urlVariables["id"]!) else {
                throw PerfectError.apiError("id")
            }
            let items = try self.repository.getPublished(categoryId: id)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let id = Int(request.urlVariables["id"]!) else {
                throw PerfectError.apiError("id")
            }
            let items = try self.repository.getProduct(id: id)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    /// Customer

    func ecommerceCustomerHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let customer = try self.customerRepository.get(id: Int(uniqueID)!)
            try response.setJson(customer)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    func ecommerceCustomerHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let customer: Customer = request.getJson()!
            try self.customerRepository.update(id: Int(uniqueID)!, item: customer)
            try response.setJson(customer)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    func ecommerceCustomerHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            try self.customerRepository.delete(id: Int(uniqueID)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    
    /// Basket

    func ecommerceBasketHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let items = try self.repository.getBasket(customerId: Int(uniqueID)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceBasketHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let uniqueID = request.user.authDetails?.account.uniqueID else {
                response.completed(status: .unauthorized)
                return
            }

            let basket: Basket = request.getJson()!
            basket.customerId = Int(uniqueID)!
            
            let product = Product()
            try product.get(barcode: basket.basketBarcode)
            if product.productId == 0 {
                response.completed(status: .notFound)
                return
            }
            basket.basketProduct = product
            basket.basketPrice = product._discount != nil ? product._discount!.discountPrice : product.productSellingPrice

            try self.repository.addBasket(item: basket)
            try response.setJson(basket)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceBasketHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let id = Int(request.urlVariables["id"]!) else {
                throw PerfectError.apiError("id")
            }
            let basket: Basket = request.getJson()!
            try self.repository.updateBasket(id: id, item: basket)
            try response.setJson(basket)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceBasketHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let id = request.urlVariables["id"] else {
                throw PerfectError.apiError("id")
            }
            try self.repository.deleteBasket(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    
    /// Order
    
    func ecommerceOrderHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let items = try self.repository.getOrders(customerId: Int(uniqueID)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceOrderHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            try self.repository.addOrder(customerId: Int(uniqueID)!, payment: "Cash")
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}

