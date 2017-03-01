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
    
    init() {
        self.repository = ioCContainer.resolve() as ProductProtocol
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
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func productHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func productHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Product()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: id)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }

    func productHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("/api/product/\(id) .delete: \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .created)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
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
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)", logFile: "./error.log")
            response.badRequest(error: error)
        }
    }
}
