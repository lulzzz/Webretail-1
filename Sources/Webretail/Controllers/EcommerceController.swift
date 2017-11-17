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
    private let registryRepository: RegistryProtocol

    init() {
        self.repository = ioCContainer.resolve() as EcommerceProtocol
        self.registryRepository = ioCContainer.resolve() as RegistryProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        /// Guest Api
        routes.add(method: .get, uri: "/api/ecommerce/category", handler: ecommerceCategoriesHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/brand", handler: ecommerceBrandsHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/new", handler: ecommerceNewsHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/featured", handler: ecommerceFeaturedHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/category/{name}", handler: ecommerceCategoryHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/brand/{name}", handler: ecommerceBrandHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/product/{name}", handler: ecommerceProductHandlerGET)

        /// Registry Api
        routes.add(method: .get, uri: "/api/ecommerce/registry", handler: ecommerceRegistryHandlerGET)
        routes.add(method: .put, uri: "/api/ecommerce/registry", handler: ecommerceRegistryHandlerPUT)
        routes.add(method: .delete, uri: "/api/ecommerce/registry", handler: ecommerceRegistryHandlerDELETE)

        routes.add(method: .get, uri: "/api/ecommerce/basket", handler: ecommerceBasketHandlerGET)
        routes.add(method: .post, uri: "/api/ecommerce/basket", handler: ecommerceBasketHandlerPOST)
        routes.add(method: .put, uri: "/api/ecommerce/basket/{id}", handler: ecommerceBasketHandlerPUT)
        routes.add(method: .delete, uri: "/api/ecommerce/basket/{id}", handler: ecommerceBasketHandlerDELETE)

        routes.add(method: .get, uri: "/api/ecommerce/order", handler: ecommerceOrdersHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/order/{id}", handler: ecommerceOrderHandlerGET)
        routes.add(method: .get, uri: "/api/ecommerce/order/{id}/items", handler: ecommerceOrderItemsHandlerGET)
        routes.add(method: .post, uri: "/api/ecommerce/order", handler: ecommerceOrderHandlerPOST)
        
        return routes
    }

    
    /// Products

    func ecommerceCategoriesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getCategories()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceBrandsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getBrands()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceNewsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getProductsNews()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceFeaturedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items = try self.repository.getProductsFeatured()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceCategoryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let name = request.urlVariables["name"] else {
                throw PerfectError.apiError("name")
            }
            let items = try self.repository.getProducts(category: name)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceBrandHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let name = request.urlVariables["name"] else {
                throw PerfectError.apiError("name")
            }
            let items = try self.repository.getProducts(brand: name)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let name = request.urlVariables["name"] else {
                throw PerfectError.apiError("name")
            }
            let items = try self.repository.getProduct(name: name)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    /// Registry

    func ecommerceRegistryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let registry = try self.registryRepository.get(id: Int(uniqueID)!)
            try response.setJson(registry)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceRegistryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            guard let registry: Registry = request.getJson() else {
                throw PerfectError.apiError("model invalid")
            }
            try self.registryRepository.update(id: Int(uniqueID)!, item: registry)
            try response.setJson(registry)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceRegistryHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            try self.registryRepository.delete(id: Int(uniqueID)!)
            response.completed(status: .noContent)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    
    /// Basket

    func ecommerceBasketHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let items = try self.repository.getBasket(registryId: Int(uniqueID)!)
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

            guard let basket: Basket = request.getJson() else {
                throw PerfectError.apiError("invalid model")
            }
            basket.registryId = Int(uniqueID)!
            
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
            guard let basket: Basket = request.getJson() else {
                throw PerfectError.apiError("invalid model")
            }
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
    
    func ecommerceOrdersHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let items = try self.repository.getOrders(registryId: Int(uniqueID)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func ecommerceOrderHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            guard let id = Int(request.urlVariables["id"]!) else {
                throw PerfectError.apiError("id")
            }
            let item = try self.repository.getOrder(registryId: Int(uniqueID)!, id: id)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceOrderItemsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            guard let id = Int(request.urlVariables["id"]!) else {
                throw PerfectError.apiError("id")
            }
            let items = try self.repository.getOrderItems(registryId: Int(uniqueID)!, id: id)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func ecommerceOrderHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
        do {
            let order = try self.repository.addOrder(registryId: Int(uniqueID)!, payment: "Cash")
            try response.setJson(order)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}

