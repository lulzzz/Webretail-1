//
//  ArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class ArticleController {
    
    private let repository: ArticleProtocol
    
    init(repository: ArticleProtocol) {
        
        self.repository = repository
        
        let article = Article()
        try? article.setup()
        
//        do {
//            let item1 = Article()
//            item1.productId = 1
//            item1.barcode = "11111111111"
//            try self.repository.add(item: item1)
//            
//            let item2 = Article()
//            item2.productId = 1
//            item2.barcode = "22222222222"
//            try self.repository.add(item: item2)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/article", handler: {
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
        
        routes.add(method: .get, uri: "/api/article/{id}", handler: {
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
        
        routes.add(method: .post, uri: "/api/article", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Article
                try self.repository.add(item: item!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/article/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Article
                try self.repository.update(id: id!, item: item!)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/article/{id}", handler: {
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
