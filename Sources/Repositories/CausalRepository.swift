//
//  CausalRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

struct CausalRepository : CausalProtocol {

    func getAll(date: Int) throws -> [Causal] {
        let items = Causal()
        try items.query(whereclause: "causalUpdated > $1", params: [date])
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Causal? {
        let item = Causal()
		try item.query(id: id)
		
        return item
    }
    
    func add(item: Causal) throws {
        item.causalCreated = Int.now()
        item.causalUpdated = Int.now()
        try item.save {
            id in item.causalId = id as! Int
        }
    }
    
    func update(id: Int, item: Causal) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.causalName = item.causalName
        current.causalQuantity = item.causalQuantity
        current.causalBooked = item.causalBooked
		current.causalIsPos = item.causalIsPos
		current.causalUpdated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Causal()
        item.causalId = id
        try item.delete()
    }
}
