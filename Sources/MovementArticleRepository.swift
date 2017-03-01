//
//  MovementArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

class MovementArticleRepository : MovementArticleProtocol {
    
    init() {
        let movementArticle = MovementArticle()
        try? movementArticle.setup()
    }
    
    func getAll() throws -> [MovementArticle] {
        let items = MovementArticle()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> MovementArticle? {
        let item = MovementArticle()
        try item.get(id)
        
        return item
    }
    
    func add(item: MovementArticle) throws {
        item.created = Int.now()
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
}