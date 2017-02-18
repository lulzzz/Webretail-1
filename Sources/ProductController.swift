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
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Product
                try self.repository.add(item: item!)
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
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Product
                try self.repository.update(id: id!, item: item!)
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
            } catch {
                print(error)
            }
            response.completed()
        })
        
        return routes
    }
}
