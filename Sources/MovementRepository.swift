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

	func getStatus() -> [MovementStatus] {
		var status = [MovementStatus]()
		status.append(MovementStatus(value: "New"))
		status.append(MovementStatus(value: "Processing"))
		status.append(MovementStatus(value: "Suspended"))
		status.append(MovementStatus(value: "Canceled"))
		status.append(MovementStatus(value: "Completed"))
		return status
	}
	
	func getAll() throws -> [Movement] {
        let items = Movement()
		try items.query()
		
        return try items.rows()
    }
    
    func get(id: Int) throws -> Movement? {
        let item = Movement()
		try item.query(id: id)

		return item
    }
		
    func add(item: Movement) throws {
		if item.movementNumber == 0 {
			try item.newNumber()
		}
        item.updated = Int.now()
        try item.save {
            id in item.movementId = id as! Int
        }
    }
    
    func update(id: Int, item: Movement) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
		if item.movementStatus == "New" {
			current.movementNumber = item.movementNumber
			current.movementDate = item.movementDate
			current.movementDesc = item.movementDesc
			current.movementUser = item.movementUser
			current.movementDevice = item.movementDevice
			current.causal = item.causal
			current.store = item.store
			current.customer = item.customer
		}
		else if current.movementStatus == "New" && item.movementStatus == "Processing" {
			try process(movement: current, actionType: ActionType.Booking)
		}
		else if current.movementStatus == "Processing" && item.movementStatus != "Processing" {
			try process(movement: current, actionType: ActionType.Unbooking)
		}
		else if current.movementStatus != "Completed" && item.movementStatus == "Completed" {
			try process(movement: current, actionType: ActionType.Stoking)
		}
		current.movementStatus = item.movementStatus
		current.movementNote = item.movementNote
		current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Movement()
        item.movementId = id
        try item.delete()
    }

	internal func process(movement: Movement, actionType: ActionType) throws {
		
		let storeId = movement.getJSONValue(named: "storeId", from: movement.store, defaultValue: 0)
		let quantity = movement.getJSONValue(named: "quantity", from: movement.causal, defaultValue: 0)
		let booked = movement.getJSONValue(named: "booked", from: movement.causal, defaultValue: 0)

		var stock = Stock()
		let article = MovementArticle()
		try article.query(data: [("movementId", movement.movementId)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "articleId", from: articles[0], defaultValue: 0)
			
			try stock.query(
				whereclause: "articleId = $1 AND storeId = $2",
				params: [ articleId, storeId ],
				cursor: StORMCursor(limit: 1, offset: 0))
			
			if (stock.rows().count == 0) {
				stock.storeId = storeId
				stock.articleId = articleId
				try stock.save()
			} else {
				stock = stock.rows().first!
			}
			
			switch actionType {
			case ActionType.Booking:
				if booked > 0 {
					stock.booked += item.quantity
				}
			case ActionType.Unbooking:
				stock.booked -= item.quantity
			default:
				if quantity > 0 {
					stock.quantity += item.quantity
				} else if quantity < 0 {
					stock.quantity -= item.quantity
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
