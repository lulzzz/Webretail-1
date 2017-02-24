//
//  AccountController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import PerfectTurnstilePostgreSQL
import PerfectHTTP

class UserController {
    
    private let repository: UserProtocol
    
    init(repository: UserProtocol) {
        
        self.repository = repository
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/account", handler: {
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
        
        routes.add(method: .get, uri: "/api/account/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]
                let item = try self.repository.get(id: id!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .post, uri: "/api/account", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = User()
                item.setJSONValues(json!)
                try self.repository.add(item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/account/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = User()
                item.setJSONValues(json!)
                try self.repository.update(id: id!, item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/account/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]
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
