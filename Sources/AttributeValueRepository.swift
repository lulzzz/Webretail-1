//
//  AttributeValueRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class AttributeValueRepository : AttributeValueProtocol {
    
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
        try item.save {
            id in item.attributeValueId = id as! Int
        }
    }
    
    func update(id: Int, item: AttributeValue) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = AttributeValue()
        item.attributeValueId = id
        try item.delete()
    }
}
