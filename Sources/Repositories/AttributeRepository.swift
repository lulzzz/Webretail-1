//
//  AttributeRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct AttributeRepository : AttributeProtocol {

    func getAll() throws -> [Attribute] {
        let items = Attribute()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Attribute? {
        let item = Attribute()
		try item.query(id: id)
		
        return item
    }
    
    func getValues(id: Int) throws -> [AttributeValue] {
        let items = AttributeValue()
        try items.query(whereclause: "attributeId = $1",
		                params: [id],
		                cursor: StORMCursor(limit: 10000, offset: 0))
		
        return items.rows()
    }
    
    func add(item: Attribute) throws {
        item.attributeCreated = Int.now()
        item.attributeUpdated = Int.now()
        try item.save {
            id in item.attributeId = id as! Int
        }
    }
    
    func update(id: Int, item: Attribute) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.attributeName = item.attributeName
        current.attributeUpdated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Attribute()
        item.attributeId = id
        try item.delete()

        try item.sql("DELETE FROM attributevalues WHERE attributeId = $1", params: [String(id)])
    }
}
