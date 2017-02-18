//
//  ProductAttributeValueRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class ProductAttributeValueRepository : ProductAttributeValueProtocol {
    
    func getAll() throws -> [ProductAttributeValue] {
        let items = ProductAttributeValue()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> ProductAttributeValue? {
        let item = ProductAttributeValue()
        try item.get(id)
        
        return item
    }
    
    func add(item: ProductAttributeValue) throws {
        try item.save {
            id in item.productAttributeValueId = id as! Int
        }
    }
    
    func update(id: Int, item: ProductAttributeValue) throws {
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = ProductAttributeValue()
        item.productAttributeValueId = id
        try item.delete()
    }
}
