//
//  ProductController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP
import PerfectLogger

class ProductController {
    
    private let repository: ProductProtocol
    
    init(repository: ProductProtocol) {
        
        self.repository = repository
        
        let product = Product()
        try? product.setup()

        let productCategory = ProductCategory()
        try? productCategory.setup()

        let productAttribute = ProductAttribute()
        try? productAttribute.setup()

        let productAttributeValue = ProductAttributeValue()
        try? productAttributeValue.setup()
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,    uri: "/api/product",                handler: productsHandlerGET)
        routes.add(method: .get,    uri: "/api/product/{id}",           handler: productHandlerGET)
        routes.add(method: .post,   uri: "/api/product",                handler: productHandlerPOST)
        routes.add(method: .put,    uri: "/api/product/{id}",           handler: productHandlerPUT)
        routes.add(method: .delete, uri: "/api/product/{id}",           handler: productHandlerDELETE)
        routes.add(method: .post,   uri: "/api/productcategory",        handler: productCategoryHandlerPOST)
        routes.add(method: .put,    uri: "/api/productcategory",        handler: productCategoryHandlerPUT)
        routes.add(method: .post,   uri: "/api/productattribute",       handler: productAttributeHandlerPOST)
        routes.add(method: .put,    uri: "/api/productattribute",       handler: productAttributeHandlerPUT)
        routes.add(method: .post,   uri: "/api/productattributevalue",  handler: productAttributeValueHandlerPOST)
        routes.add(method: .put,    uri: "/api/productattributevalue",  handler: productAttributeValueHandlerPUT)
        
        return routes
    }
    
    func productsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/product .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.ok)
        } catch {
            LogFile.error("/api/product/\(id) .get: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Product()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/product .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Product()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: id)
            response.completed(status: HTTPResponseStatus.accepted)
        } catch {
            LogFile.error("/api/product/\(id) .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]?.toInt()
        do {
            try self.repository.delete(id: id!)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/product/\(id) .delete: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productCategoryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductCategory]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductCategory()
                item.setJSONValues(json)
                try self.repository.addCategory(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/productcategory .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productCategoryHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductCategory()
                item.setJSONValues(json)
                try self.repository.removeCategory(item: item)
            }
            try response.setBody(json: jsons)
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/productcategory .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productAttributeHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductAttribute]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductAttribute()
                item.setJSONValues(json)
                try self.repository.addAttribute(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/productattribute .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func productAttributeHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductAttribute()
                item.setJSONValues(json)
                try self.repository.removeAttribute(item: item)
            }
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/productattribute .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }

    func productAttributeValueHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            var result = [ProductAttributeValue]()
            
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductAttributeValue()
                item.setJSONValues(json)
                try self.repository.addAttributeValue(item: item)
                result.append(item)
            }
            try response.setBody(json: result)
            response.completed(status: HTTPResponseStatus.created)
        } catch {
            LogFile.error("/api/productattributevalue .post: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
    
    func productAttributeValueHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
            for json in jsons! {
                let item = ProductAttributeValue()
                item.setJSONValues(json)
                try self.repository.removeAttributeValue(item: item)
            }
            response.completed(status: HTTPResponseStatus.noContent)
        } catch {
            LogFile.error("/api/productattributevalue .put: \(error)", logFile: "./error.log")
            response.completed(status: HTTPResponseStatus.badRequest)
        }
    }
}
