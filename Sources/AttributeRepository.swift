//
//  AttributeRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

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
    
    func add(item: Attribute) throws {
        try item.save {
            id in item.attributeId = id as! Int
        }
    }
    
    func update(id: Int, item: Attribute) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Attribute()
        item.attributeId = id
        try item.delete()
    }
}
