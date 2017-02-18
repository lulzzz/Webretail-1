//
//  PublicationController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import PerfectHTTP

class PublicationController {
    
    private let repository: PublicationProtocol
    
    init(repository: PublicationProtocol) {
        
        self.repository = repository
        
        let publication = Publication()
        try? publication.setup()
        
//        do {
//            let item1 = Publication()
//            item1.productId = 1
//            item1.featured = true
//            item1.startAt = Helper.now()
//            item1.finishAt = Int(Date().addingTimeInterval(30*24*60*60).timeIntervalSinceReferenceDate)
//            try self.repository.add(item: item1)
// 
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/publication", handler: {
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
        
        routes.add(method: .get, uri: "/api/publication/{id}", handler: {
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
        
        routes.add(method: .post, uri: "/api/publication", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Publication
                try self.repository.add(item: item!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/publication/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = request.postBodyString
                let item = try json?.jsonDecode() as? Publication
                try self.repository.update(id: id!, item: item!)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/publication/{id}", handler: {
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
