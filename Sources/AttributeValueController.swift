//
//  AttributeValueController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//


import PerfectHTTP

class AttributeValueController {
    
    private let repository: AttributeValueProtocol
    
    init(repository: AttributeValueProtocol) {
        
        self.repository = repository
        
        let attributeValue = AttributeValue()
        try? attributeValue.setup()
        
//        do {
//            let item1 = AttributeValue()
//            item1.attributeId = 1
//            item1.attributeValueCode = "00001"
//            item1.attributeValueName = "Black"
//            try self.repository.add(item: item1)
//            
//            let item2 = AttributeValue()
//            item2.attributeId = 2
//            item2.attributeValueCode = "001"
//            item2.attributeValueName = "Small"
//            try self.repository.add(item: item2)
//        } catch {
//            print(error)
//        }
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/attributevalue", handler: {
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
        
        routes.add(method: .get, uri: "/api/attributevalue/{id}", handler: {
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
        
        routes.add(method: .post, uri: "/api/attributevalue", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = AttributeValue()
                item.setJSONValues(json!)
                try self.repository.add(item: item)
                try response.setBody(json: item)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .put, uri: "/api/attributevalue/{id}", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            
            do {
                let id = request.urlVariables["id"]?.toInt()
                let json = try request.postBodyString?.jsonDecode() as? [String:Any]
                let item = AttributeValue()
                item.setJSONValues(json!)
                try self.repository.update(id: id!, item: item)
                try response.setBody(json: id)
            } catch {
                print(error)
            }
            response.completed()
        })
        
        routes.add(method: .delete, uri: "/api/attributevalue/{id}", handler: {
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
