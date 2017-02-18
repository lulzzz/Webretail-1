//
//  ProductAttributeRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//


class ProductAttributeRepository : ProductAttributeProtocol {
    
    func getAll() throws -> [ProductAttribute] {
        let items = ProductAttribute()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> ProductAttribute? {
        let item = ProductAttribute()
        try item.get(id)
        
        return item
    }
    
    func add(item: ProductAttribute) throws {
        try item.save {
            id in item.productAttributeId = id as! Int
        }
    }
    
    func update(id: Int, item: ProductAttribute) throws {
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = ProductAttribute()
        item.productAttributeId = id
        try item.delete()
    }
}
