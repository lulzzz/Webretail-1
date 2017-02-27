//
//  AttributeValueRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class AttributeValueRepository : AttributeValueProtocol {
    
    init() {
        let attributeValue = AttributeValue()
        try? attributeValue.setup()
    }

    func getAll() throws -> [AttributeValue] {
        let items = AttributeValue()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> AttributeValue? {
        let item = AttributeValue()
        try item.get(id)
        
        return item
    }
    
    func add(item: AttributeValue) throws {
        item.created = Int.now()
        item.updated = Int.now()
        try item.save {
            id in item.attributeValueId = id as! Int
        }
    }
    
    func update(id: Int, item: AttributeValue) throws {

        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.attributeValueCode = item.attributeValueCode
        current.attributeValueName = item.attributeValueName
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = AttributeValue()
        item.attributeValueId = id
        try item.delete()
    }
}
