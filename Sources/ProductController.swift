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

//        do {
//            let item = Product()
//            item.brandId = 1
//            item.productCode = "010101"
//            item.productName = "Bomber"
//            item.productUm = "QT"
//            item.productPrice = 20.05
//            try self.repository.add(item: item)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/product", handler: {
            _, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let items = try self.repository.getAll()
                try response.setBody(json: items)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .get, uri: "/api/product/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let item = try self.repository.get(id: id!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .post, uri: "/api/product", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Product()
                item.setJSONValues(json!)
                try self.repository.add(item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/product/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Product()
                item.setJSONValues(json!)
                try self.repository.update(id: id!, item: item)
                try response.setBody(json: id)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/product/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                try self.repository.delete(id: id!)
                try response.setBody(json: id)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .post, uri: "/api/productcategory", handler: {
            request, response in
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
            } catch {
                print(error)
            }
            response.completed()
        })

        routes.add(method: .put, uri: "/api/productcategory", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
                for json in jsons! {
                    let item = ProductCategory()
                    item.setJSONValues(json)
                    try self.repository.removeCategory(item: item)
                }
                try response.setBody(json: jsons)
            } catch {
                print(error)
            }
            response.completed()
        })

        routes.add(method: .post, uri: "/api/productattribute", handler: {
            request, response in
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
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/productattribute", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
                for json in jsons! {
                    let item = ProductAttribute()
                    item.setJSONValues(json)
                    try self.repository.removeAttribute(item: item)
                }
                try response.setBody(json: jsons)
            } catch {
                print(error)
            }
            response.completed()
        })

        routes.add(method: .post, uri: "/api/productattributevalue", handler: {
            request, response in
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
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/productattributevalue", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let jsons = try request.postBodyString?.jsonDecode() as? [[String:Any]]
                for json in jsons! {
                    let item = ProductAttributeValue()
                    item.setJSONValues(json)
                    try self.repository.removeAttributeValue(item: item)
                }
                try response.setBody(json: jsons)
            } catch {
                print(error)
            }
            response.completed()
        })

        return routes
    }
}
