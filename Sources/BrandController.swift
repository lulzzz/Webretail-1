//
//  BrandController.swift
//  PerfectTurnstilePostgreSQLDemo
//
//  Created by Gerardo Grisolini on 16/02/17.
//
//

import Foundation
import PerfectHTTP

class BrandController {
    
    private let repository: BrandProtocol
    
    init(repository: BrandProtocol) {
        
        self.repository = repository
        
        let brand = Brand()
        try? brand.setup()
    
//        do {
//            let item1 = Brand()
//            item1.brandName = "Armani"
//            try self.repository.add(item: item1)
//            
//            let item2 = Brand()
//            item2.brandName = "Gabbana"
//            try self.repository.add(item: item2)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/brand", handler: {
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
        
        routes.add(method: .get, uri: "/api/brand/{id}", handler: {
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
        
        routes.add(method: .post, uri: "/api/brand", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Brand()
                item.setJSONValues(json!)
                try self.repository.add(item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/brand/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Brand()
                item.setJSONValues(json!)
                try self.repository.update(id: id!, item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/brand/{id}", handler: {
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
        
        return routes
    }
}
