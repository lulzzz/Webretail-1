//
//  ProductController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class ProductController {
    
    private let repository: ProductProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as ProductProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/product", handler: productsHandlerGET)
		routes.add(method: .get, uri: "/api/productfrom/{date}", handler: productsHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}", handler: productHandlerGET)
        routes.add(method: .get, uri: "/api/product/{id}/publication", handler: publicationProductHandlerGET)
        routes.add(method: .put, uri: "/api/product/{id}/publication", handler: productPublicationHandlerPUT)
		routes.add(method: .post, uri: "/api/product", handler: productHandlerPOST)
        routes.add(method: .post, uri: "/api/product/import", handler: productImportHandlerPOST)
        routes.add(method: .put, uri: "/api/product/{id}", handler: productHandlerPUT)
        routes.add(method: .delete, uri: "/api/product/{id}", handler: productHandlerDELETE)
        routes.add(method: .post, uri: "/api/productcategory", handler: productCategoryHandlerPOST)
        routes.add(method: .put, uri: "/api/productcategory", handler: productCategoryHandlerPUT)
        routes.add(method: .post, uri: "/api/productattribute", handler: productAttributeHandlerPOST)
        routes.add(method: .put, uri: "/api/productattribute", handler: productAttributeHandlerPUT)
        routes.add(method: .post, uri: "/api/productattributevalue", handler: productAttributeValueHandlerPOST)
        routes.add(method: .put, uri: "/api/productattributevalue", handler: productAttributeValueHandlerPUT)
        
        return routes
    }
    
    func productsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 0 : Int(date!)!)
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
			let id = request.urlVariables["id"]!
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Product = request.getJson()!
            try self.repository.add(item: item)
            try response.setJson(item)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productImportHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Product = request.getJson()!
            let result = try self.repository.create(item: item)
            try response.setBody(json: result)
            response.completed(status: .created)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
			let id = request.urlVariables["id"]!
            let item: Product = request.getJson()!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        do {
			let id = request.urlVariables["id"]!
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func publicationProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(productId: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productPublicationHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let id = request.urlVariables["id"]!
            let item: Product = request.getJson()!
            try self.repository.publish(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productCategoryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductCategory] = request.getJson()!
            for item in items {
                try self.repository.addCategory(item: item)
            }
            try response.setJson(items)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productCategoryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductCategory] = request.getJson()!
            for item in items {
                try self.repository.removeCategory(item: item)
            }
            try response.setJson(items)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productAttributeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductAttribute] = request.getJson()!
            for item in items {
                try self.repository.addAttribute(item: item)
            }
            try response.setJson(items)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productAttributeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductAttribute] = request.getJson()!
            for item in items {
                try self.repository.removeAttribute(item: item)
            }
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductAttributeValue] = request.getJson()!
            for item in items {
                try self.repository.addAttributeValue(item: item)
            }
            try response.setJson(items)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productAttributeValueHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let items: [ProductAttributeValue] = request.getJson()!
            for item in items {
                try self.repository.removeAttributeValue(item: item)
            }
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
