//
//  MovementRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

class MovementRepository : MovementProtocol {
    
    init() {
        try? Movement().setup()
    }
    
	func getAll(committed: Bool) throws -> [Movement] {
        let items = Movement()
		try items.select(
			whereclause: "committed = $1",
			params: [committed],
			orderby: ["movementId"])
		
        return try items.rows()
    }
    
    func get(id: Int) throws -> Movement? {
        let item = Movement()
        try item.get(id)
        
		// get store
		let store = Store()
		try store.get(item.storeId)
		item._store = store
		
		// get causal
		let causal = Causal()
		try causal.get(item.causalId)
		item._causal = causal

		return item
    }
	
    func add(item: Movement) throws {
        item.updated = Int.now()
        try item.save {
            id in item.movementId = id as! Int
        }
    }
    
    func update(id: Int, item: Movement) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.causalId = item.causalId
        current.storeId = item.storeId
        current.movementDesc = item.movementDesc
        current.movementNote = item.movementNote
		current.created = item.created
		current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Movement()
        item.movementId = id
        try item.delete()
    }

	func commit(id: Int) throws {
		let movement = try get(id: id)!
		if movement.committed {
			throw StORMError.error("Movement already committed")
		}
		
		var stock = Stock()
		let article = MovementArticle()
		try article.find([("movementId", id)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "articleId", from: articles[0], defaultValue: 0)
			
			let cursor = StORMCursor(limit: 1, offset: 0)
			try stock.select(
				whereclause: "articleId = $1 AND storeId = $2",
				params: [ articleId, movement.storeId ],
				orderby: [],
				cursor: cursor)
			
			if (stock.rows().count == 0) {
				stock.storeId = movement.storeId
				stock.articleId = articleId
				try stock.save()
			} else {
				stock = stock.rows().first!
			}

			if movement._causal.quantity > 0 {
				stock.quantity += item.quantity
			} else if movement._causal.quantity < 0 {
				stock.quantity -= item.quantity
			}
			
			if movement._causal.booked > 0 {
				stock.booked += item.quantity
			} else if movement._causal.booked < 0 {
				stock.booked -= item.quantity
			}
			try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
		}
		
		movement.committed = true
		movement.updated = Int.now()
		try movement.save()
	}
	
	func rollback(id: Int) throws {
		let movement = Movement()
		try movement.get(id)
		if !movement.committed {
			throw StORMError.error("Not committed movement")
		}
		
		var stock = Stock()
		let article = MovementArticle()
		try article.find([("movementId", id)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "articleId", from: articles[0], defaultValue: 0)
			
			let cursor = StORMCursor(limit: 1, offset: 0)
			try stock.select(
				whereclause: "articleId = $1 AND stockId = $2",
				params: [ articleId, movement.storeId ],
				orderby: [],
				cursor: cursor)
			
			if (stock.rows().count == 0) {
				stock.storeId = movement.storeId
				stock.articleId = articleId
				try stock.save()
			} else {
				stock = stock.rows().first!
			}
			
			if movement._causal.quantity > 0 {
				stock.quantity -= item.quantity
			} else if movement._causal.quantity < 0 {
				stock.quantity += item.quantity
			}
			
			if movement._causal.booked > 0 {
				stock.booked -= item.quantity
			} else if movement._causal.booked < 0 {
				stock.booked += item.quantity
			}
			try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
		}
		
		movement.committed = false
		movement.updated = Int.now()
		try movement.save()
	}
}
