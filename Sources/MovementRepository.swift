//
//  MovementRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

enum ActionType {
	case Booking
	case Unbooking
	case Stoking
}

struct MovementRepository : MovementProtocol {

	func getStatus() -> [ItemValue] {
		var status = [ItemValue]()
		status.append(ItemValue(value: "New"))
		status.append(ItemValue(value: "Processing"))
		status.append(ItemValue(value: "Suspended"))
		status.append(ItemValue(value: "Canceled"))
		status.append(ItemValue(value: "Completed"))
		return status
	}
	
	func getAll() throws -> [Movement] {
        let items = Movement()
		try items.query()
		
        return try items.rows()
    }
    
	func getInvoiced() throws -> [Movement] {
		let items = Movement()
		try items.query(whereclause: "invoiceId <> $1", params: [0])
		
		return try items.rows()
	}

	func getReceipted() throws -> [Movement] {
		let items = Movement()
		try items.query(whereclause: "movementCausal ->> 'causalIsPos' = $1",
		                params: [true],
		                orderby: ["movementDevice, movementDate, movementNumber"])
		
		return try items.rows()
	}

	func get(id: Int) throws -> Movement? {
        let item = Movement()
		try item.query(id: id)

		return item
    }
		
	func get(customerId: Int) throws -> [Movement] {
		let items = Movement()
		try items.query(whereclause: "movementCustomer ->> 'customerId' = $1 AND invoiceId = $2 AND movementStatus = $3",
		                params: [customerId, 0, "Completed"],
		                orderby: ["movementId"])
		
		return try items.rows()
	}
	
	func add(item: Movement) throws {
		if item.movementNumber == 0 {
			try item.newNumber()
		}
        item.movementUpdated = Int.now()
		
		let customer = Customer()
		customer.setJSONValues(item.movementCustomer)
		if customer.customerId <= 0 {
			customer.customerId = 0
			customer.customerCreated = customer.customerUpdated
			try customer.save {
				id in customer.customerId = id as! Int
			}
			item.movementCustomer = customer.getJSONValues()
		} else if customer.customerUpdated > 0 {
			let current = Customer()
			try current.query(id: customer.customerId)
			if current.customerUpdated < customer.customerUpdated {
				try customer.save()
			}
		}
		
		try item.save {
            id in item.movementId = id as! Int
        }
    }
    
    func update(id: Int, item: Movement) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
		item.movementUpdated = Int.now()
		if item.movementStatus == "New" {
			current.movementNumber = item.movementNumber
			current.movementDate = item.movementDate
			current.movementDesc = item.movementDesc
			current.movementUser = item.movementUser
			current.movementDevice = item.movementDevice
			current.movementCausal = item.movementCausal
			current.movementStore = item.movementStore
			current.movementCustomer = item.movementCustomer
		}
		else if current.movementStatus == "New" && item.movementStatus == "Processing" {
			try process(movement: current, actionType: ActionType.Booking)
		}
		else if current.movementStatus != "Completed" && item.movementStatus == "Completed" {
			try process(movement: current, actionType: ActionType.Stoking)
		}
		else if current.movementStatus == "Processing" && item.movementStatus != "Processing" {
			try process(movement: current, actionType: ActionType.Unbooking)
		}
		current.movementStatus = item.movementStatus
		current.movementNote = item.movementNote
		current.movementUpdated = item.movementUpdated
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Movement()
        item.movementId = id
        try item.delete()
    }

	func process(movement: Movement, actionType: ActionType) throws {
		
		let storeId = movement.getJSONValue(named: "storeId", from: movement.movementStore, defaultValue: 0)
		let quantity = movement.getJSONValue(named: "causalQuantity", from: movement.movementCausal, defaultValue: 0)
		let booked = movement.getJSONValue(named: "causalBooked", from: movement.movementCausal, defaultValue: 0)

		let article = MovementArticle()
		try article.query(whereclause: "movementId = $1",
		                  params: [movement.movementId],
		                  cursor: StORMCursor(limit: 1000, offset: 0))
		for item in article.rows() {
			
			let articles = item.movementArticleProduct["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "articleId", from: articles[0], defaultValue: 0)
			
			let stock = Stock()
			try stock.query(
				whereclause: "articleId = $1 AND storeId = $2",
				params: [ articleId, storeId ],
				cursor: StORMCursor(limit: 1, offset: 0))
			
			if (stock.stockId == 0) {
				stock.storeId = storeId
				stock.articleId = articleId
				try stock.save {
					id in stock.stockId = id as! Int
				}
			}
			
			switch actionType {
			case ActionType.Booking:
				if booked > 0 {
					stock.stockBooked += item.movementArticleQuantity
				}
			case ActionType.Unbooking:
				if booked > 0 {
					stock.stockBooked -= item.movementArticleQuantity
				}
			default:
				if quantity > 0 {
					stock.stockQuantity += item.movementArticleQuantity
				} else if quantity < 0 {
					stock.stockQuantity -= item.movementArticleQuantity
				}
			}
			try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
		}
	}
	
	func clone(sourceId: Int) throws -> Movement {
		let item = try self.get(id: sourceId)!
		item.movementId = 0
		item.movementNumber = 0
		item.movementDate = Int.now()
		item.movementStatus = "New"
		try self.add(item: item)
		return item
	}
}
