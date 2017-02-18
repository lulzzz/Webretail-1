//
//  ProductAttributeValueController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class ProductAttributeValueController {
    
    private let repository: ProductAttributeValueProtocol
    
    init(repository: ProductAttributeValueProtocol) {
        
        self.repository = repository
        
        let productAttributeValue = ProductAttributeValue()
        try? productAttributeValue.setup()
        
//        do {
//            let item1 = ProductAttributeValue()
//            item1.productAttributeId = 1
//            item1.attributeValueId = 1
//            try self.repository.add(item: item1)
//            
//            let item2 = ProductAttributeValue()
//            item2.productAttributeId = 1
//            item2.attributeValueId = 2
//            try self.repository.add(item: item2)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/productattributevalue", handler: {
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
        
        routes.add(method: .get, uri: "/api/productattributevalue/{id}", handler: {
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
        
        routes.add(method: .post, uri: "/api/productattributevalue", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? ProductAttributeValue
                try self.repository.add(item: item!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/productattributevalue/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? ProductAttributeValue
                try self.repository.update(id: id!, item: item!)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/productattributevalue/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                try self.repository.delete(id: id!)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        return routes
    }
}
