//
//  AttributeRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class AttributeRepository : AttributeProtocol {
    
    func getAll() throws -> [Attribute] {
        let items = Attribute()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Attribute? {
        let item = Attribute()
        try item.get(id)
        
        return item
    }
    
    func getValues(id: Int) throws -> [AttributeValue] {
        let items = AttributeValue()
        try items.find([("attributeId", id)])
        
        return items.rows()
    }
    
    func add(item: Attribute) throws {
        item.created = Int.now()
        item.updated = Int.now()
        try item.save {
            id in item.attributeId = id as! Int
        }
    }
    
    func update(id: Int, item: Attribute) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.attributeName = item.attributeName
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Attribute()
        item.attributeId = id
        try item.delete()
    }
}
