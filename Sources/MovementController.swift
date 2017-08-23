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
        
		routes.add(method: .get, uri: "/api/movementpayment", handler: movementPaymentsHandlerGET)
		routes.add(method: .get, uri: "/api/movementstatus", handler: movementStatusHandlerGET)
        routes.add(method: .get, uri: "/api/movement", handler: movementsHandlerGET)
		routes.add(method: .post, uri: "/api/movementsales", handler: movementsSalesHandlerPOST)
		routes.add(method: .post, uri: "/api/movementreceipted", handler: movementsReceiptedHandlerPOST)
		routes.add(method: .get, uri: "/api/movement/{id}", handler: movementHandlerGET)
		routes.add(method: .get, uri: "/api/movementfrom/{date}", handler: movementFromHandlerGET)
		routes.add(method: .get, uri: "/api/movementcustomer/{id}", handler: movementCustomerHandlerGET)
        routes.add(method: .post, uri: "/api/movement", handler: movementHandlerPOST)
		routes.add(method: .post, uri: "/api/movement/{id}", handler: movementCloneHandlerPOST)
        routes.add(method: .put, uri: "/api/movement/{id}", handler: movementHandlerPUT)
        routes.add(method: .delete, uri: "/api/movement/{id}", handler: movementHandlerDELETE)
		
        return routes
    }

	func movementPaymentsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let status = self.repository.getPayments()
			try response.setBody(json: status)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
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

	func movementsSalesHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
           	let json = try request.postBodyString?.jsonDecode() as! [String: Any]
 			let period = Period()
			period.setJSONValues(json)
			let items = try self.repository.getSales(period: period)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementsReceiptedHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
           	let json = try request.postBodyString?.jsonDecode() as! [String: Any]
			let period = Period()
			period.setJSONValues(json)
			let items = try self.repository.getReceipted(period: period)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]!
            let item = try self.repository.get(id: Int(id)!)
            try response.setBody(json: item)
            response.completed(status: .ok)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
	func movementCustomerHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let id = request.urlVariables["id"]!
			let items = try self.repository.get(customerId: Int(id)!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
	
	func movementHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let json = try request.postBodyString?.jsonDecode() as! [String: Any]
            let item = Movement()
            item.setJSONValues(json)
			try self.repository.add(item: item)
            try response.setBody(json: item)
			
			let rows = json["movementItems"] as? [[String: Any]]
			if rows != nil {
				for row in rows! {
					let newRow = MovementArticle()
					newRow.setJSONValues(row)
					newRow.movementId = item.movementId
					try self.articleRepository.add(item: newRow)
				}
			}
			if item.movementStatus == "Completed" {
				try self.repository.process(movement: item, actionType: ActionType.Stoking)
			}
			
            response.completed(status: .created)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
	func movementCloneHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let id = Int(request.urlVariables["id"]!)!
			let item = try self.repository.clone(sourceId: id)
			try self.articleRepository.clone(sourceMovementId: id, targetMovementId: item.movementId)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}

	func movementHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
			let id = request.urlVariables["id"]!
            let json = try request.postBodyString?.jsonDecode() as? [String: Any]
            let item = Movement()
            item.setJSONValues(json!)
            try self.repository.update(id: Int(id)!, item: item)
			item._amount = item.getJSONValue(named: "movementAmount", from: json!, defaultValue: 0.0)
            try response.setBody(json: item)
            response.completed(status: .accepted)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func movementHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
		do {
			let id = request.urlVariables["id"]!
            try self.repository.delete(id: Int(id)!)
            response.completed(status: .noContent)
        } catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func movementFromHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {    
        /*       
        if let tokenValue = r.headers["authorization"] {
            let data = tokenValue.split(" ")
            if data.first == "Basic" {
                let key = tokenValue.replacingOccurrences(of: "Basic ", with: "")
                let basic = key.split("#")
                let date = r.params.first!.1
                do {
                    let items = try self.repository.getAll(device: basic.first!, user: basic.last!, date: Int(date)!)
                    return .ok(.json(try items.jsonEncodedString()))
                } catch {
                    return .badRequest(.json("\(r.path) \(r.method): \(error)"))
                }
            }
        }
        return .unauthorized
        */
    }    
}
