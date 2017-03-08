//
//  MovementController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP
import PerfectLogger

class MovementController {
    
    private let repository: MovementProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as MovementProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/movement", handler: movementsHandlerGET)
		routes.add(method: .get, uri: "/api/movementcommitted", handler: movementsCommittedHandlerGET)
		routes.add(method: .get, uri: "/api/movement/{id}", handler: movementHandlerGET)
        routes.add(method: .post, uri: "/api/movement", handler: movementHandlerPOST)
        routes.add(method: .put, uri: "/api/movement/{id}", handler: movementHandlerPUT)
        routes.add(method: .delete, uri: "/api/movement/{id}", handler: movementHandlerDELETE)
		routes.add(method: .get, uri: "/api/movement/{id}/commit", handler: movementCommitHandlerGET)
		routes.add(method: .get, uri: "/api/movement/{id}/roolback", handler: movementRoolbackHandlerGET)
		
        return routes
    }
    
    func movementsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let items = try self.repository.getAll(committed: false)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
	func movementsCommittedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let items = try self.repository.getAll(committed: true)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}

	func movementHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let item = try self.repository.get(id: id.toInt()!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
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
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            let json = try request.postBodyString?.jsonDecode() as? [String:Any]
            let item = Movement()
            item.setJSONValues(json!)
            try self.repository.update(id: id.toInt()!, item: item)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }
    
    func movementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let id = request.urlVariables["id"]!
        do {
            try self.repository.delete(id: id.toInt()!)
            response.completed(status: .noContent)
        } catch {
            LogFile.error("\(request.uri) \(request.method): \(error)")
            response.badRequest(error: error)
        }
    }

	func movementCommitHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.commit(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}

	func movementRoolbackHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.repository.rollback(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
}
