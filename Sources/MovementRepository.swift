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
    
    func getAll() throws -> [Movement] {
        let items = Movement()
        try items.findAll()
        
        return try items.rows()
    }
    
    func get(id: Int) throws -> Movement? {
        let item = Movement()
        try item.get(id)
        
        return item
    }
    
    func add(item: Movement) throws {
        item.created = Int.now()
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
        current.movementUser = item.movementUser
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Movement()
        item.movementId = id
        try item.delete()
    }
}
