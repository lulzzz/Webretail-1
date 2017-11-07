//
//  TagValueRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import StORM

struct TagValueRepository : TagValueProtocol {
    
    func getAll() throws -> [TagValue] {
        let items = TagValue()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> TagValue? {
        let item = TagValue()
        try item.query(id: id)
        
        return item
    }
    
    func add(item: TagValue) throws {
        item.tagValueCreated = Int.now()
        item.tagValueUpdated = Int.now()
        try item.save {
            id in item.tagValueId = id as! Int
        }
    }
    
    func update(id: Int, item: TagValue) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.tagValueName = item.tagValueName
        current.tagValueUpdated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = TagValue()
        item.tagValueId = id
        try item.delete()
    }
}

