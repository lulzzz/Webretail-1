//
//  MovementController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import PerfectHTTP
import PerfectLib

class MovementController {
    
	private let repository: MovementProtocol
	private let articleRepository: MovementArticleProtocol
	
    init() {
        self.repository = ioCContainer.resolve() as MovementProtocol
		self.articleRepository = ioCContainer.resolve() as MovementArticleProtocol
    }
   
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/movementshipping", handler: movementShippingsHandlerGET)
        routes.add(method: .get, uri: "/api/movementpayment", handler: movementPaymentsHandlerGET)
		routes.add(method: .get, uri: "/api/movementstatus", handler: movementStatusHandlerGET)
        routes.add(method: .get, uri: "/api/movement", handler: movementsHandlerGET)
		routes.add(method: .post, uri: "/api/movementsales", handler: movementsSalesHandlerPOST)
		routes.add(method: .post, uri: "/api/movementreceipted", handler: movementsReceiptedHandlerPOST)
		routes.add(method: .get, uri: "/api/movement/{id}", handler: movementHandlerGET)
        routes.add(method: .get, uri: "/api/movement/{id}/cost/{shippingId}", handler: movementShippingCostHandlerGET)
		routes.add(method: .get, uri: "/api/movementfrom/{date}", handler: movementFromHandlerGET)
		routes.add(method: .get, uri: "/api/movementregistry/{id}", handler: movementRegistryHandlerGET)
        routes.add(method: .post, uri: "/api/movement", handler: movementHandlerPOST)
		routes.add(method: .post, uri: "/api/movement/{id}", handler: movementCloneHandlerPOST)
        routes.add(method: .put, uri: "/api/movement/{id}", handler: movementHandlerPUT)
        routes.add(method: .delete, uri: "/api/movement/{id}", handler: movementHandlerDELETE)
		
        return routes
    }

	func movementPaymentsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let status = self.repository.getPayments()
			try response.setJson(status)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
    func movementShippingsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let status = self.repository.getShippings()
            try response.setJson(status)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func movementShippingCostHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let id = request.urlVariables["id"] else {
                throw PerfectError.apiError("id")
            }
            guard let shippingId = request.urlVariables["shippingId"] else {
                throw PerfectError.apiError("shippingId")
            }
            let item = try self.repository.get(id: Int(id)!)!
            let cost = (ioCContainer.resolve() as EcommerceProtocol).getShippingCost(id: shippingId, registry: item.movementRegistry)
            try response.setJson(cost)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func movementStatusHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let status = self.repository.getStatus()
			try response.setJson(status)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func movementsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
			let items = try self.repository.getAll()
            try response.setJson(items)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

	func movementsSalesHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
           	let period: Period = request.getJson()!
			let items = try self.repository.getSales(period: period)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementsReceiptedHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
            let period: Period = request.getJson()!
            let items = try self.repository.getReceipted(period: period)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
			let id = request.urlVariables["id"]!
            let item = try self.repository.get(id: Int(id)!)
            try response.setJson(item)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
	func movementRegistryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let id = request.urlVariables["id"]!
			let items = try self.repository.get(registryId: Int(id)!)
			try response.setJson(items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let item: Movement = request.getJson() else {
                throw PerfectError.apiError("model invalid")
            }
			try self.repository.add(item: item)
            try response.setJson(item)
			
            for row in item._items {
                row.movementId = item.movementId
                try self.articleRepository.add(item: row)
            }
			if item.movementStatus == "Completed" {
				try self.repository.process(movement: item, actionTypes: [.Delivering, .Stoking])
			}
			
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
	func movementCloneHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let id = Int(request.urlVariables["id"]!)!
			let item = try self.repository.clone(sourceId: id)
			try self.articleRepository.clone(sourceMovementId: id, targetMovementId: item.movementId)
			try response.setJson(item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func movementHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            guard let item: Movement = request.getJson() else {
                throw PerfectError.apiError("model invalid")
            }
            let id = request.urlVariables["id"]!
            try self.repository.update(id: Int(id)!, item: item)
            try response.setJson(item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		do {
			let id = request.urlVariables["id"]!
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func movementFromHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let date = request.urlVariables["date"]!
        do {
            if let apiKey = request.auth?.basic {
                let items = try self.repository.getAll(device: apiKey.id, user: apiKey.secret, date: Int(date)!)
                try response.setJson(items)
                response.completed(status: .ok)
            } else {
                response.completed(status: .unauthorized)
            }
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
