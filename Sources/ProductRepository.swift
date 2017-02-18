//
//  ProductRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class ProductRepository : ProductProtocol {
    
    func getAll() throws -> [Product] {
        let items = Product()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Product? {
        let item = Product()
        try item.get(id)
        
        return item
    }
    
    func add(item: Product) throws {
        try item.save {
            id in item.productId = id as! Int
        }
    }
    
    func update(id: Int, item: Product) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Product()
        item.productId = id
        try item.delete()
    }
}
