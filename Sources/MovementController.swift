//
//  MovementController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP

class MovementController {
    
	private let repository: MovementProtocol
	private let articleRepository: MovementArticleProtocol
	
    init() {
        self.repository = ioCContainer.resolve() as MovementProtocol
		self.articleRepository = ioCContainer.resolve() as MovementArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
		routes.add(method: .get, uri: "/api/movementstatus", handler: movementStatusHandlerGET)
        routes.add(method: .get, uri: "/api/movement", handler: movementsHandlerGET)
		routes.add(method: .get, uri: "/api/movement/{id}", handler: movementHandlerGET)
        routes.add(method: .post, uri: "/api/movement", handler: movementHandlerPOST)
		routes.add(method: .post, uri: "/api/movement/{id}", handler: movementCloneHandlerPOST)
        routes.add(method: .put, uri: "/api/movement/{id}", handler: movementHandlerPUT)
        routes.add(method: .delete, uri: "/api/movement/{id}", handler: movementHandlerDELETE)
		
        return routes
    }
    
	func movementStatusHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let status = self.repository.getStatus()
			try response.setBody(json: status)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func movementsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let items = try self.repository.getAll()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

	func movementHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]?.toInt()
            let item = try self.repository.get(id: id!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Movement()
            item.setJSONValues(json!)
            try self.repository.add(item: item)
            try response.setBody(json: item)
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
	func movementCloneHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let id = request.urlVariables["id"]?.toInt()
			let item = try self.repository.clone(sourceId: id!)
			try self.articleRepository.clone(sourceMovementId: id!, targetMovementId: item.movementId)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func movementHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]?.toInt()
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Movement()
            item.setJSONValues(json!)
            try self.repository.update(id: id!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
		do {
			let id = request.urlVariables["id"]?.toInt()
            try self.repository.delete(id: id!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
