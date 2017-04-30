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
		routes.add(method: .post, uri: "/api/product", handler: productHandlerPOST)
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
        response.setHeader(.contentType, value: "application/json")
        
		let date = request.urlVariables["date"]
		do {
			let items = try self.repository.getAll(date: date == nil ? 0 : date!.toInt()!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]?.toInt()
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String: Any]
            let item = Product()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]?.toInt()
            let json = try request.postBodyString?.jsonDecode() as? [String: Any]
            let item = Product()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]?.toInt()
            try self.repository.delete(id: id!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productCategoryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductCategory]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductCategory()
                item.setJSONValues(json)
                try self.repository.addCategory(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productCategoryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductCategory()
                item.setJSONValues(json)
                try self.repository.removeCategory(item: item)
            }
            try response.setBody(json: jsons)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productAttributeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductAttribute]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductAttribute()
                item.setJSONValues(json)
                try self.repository.addAttribute(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productAttributeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductAttribute()
                item.setJSONValues(json)
                try self.repository.removeAttribute(item: item)
            }
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func productAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductAttributeValue]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductAttributeValue()
                item.setJSONValues(json)
                try self.repository.addAttributeValue(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func productAttributeValueHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String: Any]]
            for json in jsons! {
                let item = ProductAttributeValue()
                item.setJSONValues(json)
                try self.repository.removeAttributeValue(item: item)
            }
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
