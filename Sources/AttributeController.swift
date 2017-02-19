//
//  AttributeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectHTTP

class AttributeController {
    
    private let repository: AttributeProtocol
    
    init(repository: AttributeProtocol) {
        
        self.repository = repository
        
        let attribute = Attribute()
        try? attribute.setup()

//        do {
//            let item1 = Attribute()
//            item1.attributeName = "Color"
//            try self.repository.add(item: item1)
//            
//            let item2 = Attribute()
//            item2.attributeName = "Size"
//            try self.repository.add(item: item2)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/attribute", handler: {
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
        
        routes.add(method: .get, uri: "/api/attribute/{id}", handler: {
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
        
        routes.add(method: .get, uri: "/api/attribute/{id}/value", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let item = try self.repository.getValues(id: id!)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })

        routes.add(method: .post, uri: "/api/attribute", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Attribute()
                item.setJSONValues(json!)
                try self.repository.add(item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/attribute/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = Attribute()
                item.setJSONValues(json!)
                try self.repository.update(id: id!, item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/attribute/{id}", handler: {
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
