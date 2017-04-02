//
//  MovementArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

struct MovementArticleRepository : MovementArticleProtocol {

    func get(movementId: Int) throws -> [MovementArticle] {
        let items = MovementArticle()
        try items.query(
            whereclause: "movementId = $1",
            params: [movementId],
            orderby: ["movementArticleId"]
        )
    
        return items.rows()
    }
    
    func get(id: Int) throws -> MovementArticle? {
        let item = MovementArticle()
		try item.query(id: id)
		
        return item
    }
    
    func add(item: MovementArticle) throws {
        item.updated = Int.now()
        try item.save {
            id in item.movementArticleId = id as! Int
        }
    }
    
    func update(id: Int, item: MovementArticle) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.quantity = item.quantity
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = MovementArticle()
        item.movementArticleId = id
        try item.delete()
    }
	
	func clone(sourceMovementId: Int, targetMovementId: Int) throws {
		let items = try self.get(movementId: sourceMovementId)
		for item in items {
			item.movementArticleId = 0
			item.movementId = targetMovementId
			try self.add(item: item)
		}
	}
}
