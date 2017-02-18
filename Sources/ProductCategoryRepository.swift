//
//  ProductCategoryRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class ProductCategoryRepository : ProductCategoryProtocol {
    
    func getAll() throws -> [ProductCategory] {
        let items = ProductCategory()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> ProductCategory? {
        let item = ProductCategory()
        try item.get(id)
        
        return item
    }
    
    func add(item: ProductCategory) throws {
        try item.save {
            id in item.productCategoryId = id as! Int
        }
    }
    
    func update(id: Int, item: ProductCategory) throws {
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = ProductCategory()
        item.productCategoryId = id
        try item.delete()
    }
}
