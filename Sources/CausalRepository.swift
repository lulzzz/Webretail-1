//
//  CausalRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

struct CausalRepository : CausalProtocol {

    func getAll() throws -> [Causal] {
        let items = Causal()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Causal? {
        let item = Causal()
        try item.query(id)
        
        return item
    }
    
    func add(item: Causal) throws {
        item.created = Int.now()
        item.updated = Int.now()
        try item.save {
            id in item.causalId = id as! Int
        }
    }
    
    func update(id: Int, item: Causal) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.causalName = item.causalName
        current.quantity = item.quantity
        current.booked = item.booked
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Causal()
        item.causalId = id
        try item.delete()
    }
}
