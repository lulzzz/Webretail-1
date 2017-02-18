//
//  CatgoryRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class CategoryRepository : CategoryProtocol {
    
    func getAll() throws -> [Category] {
        let items = Category()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Category? {
        let item = Category()
        try item.get(id)
        
        return item
    }
    
    func add(item: Category) throws {
        try item.save {
            id in item.categoryId = id as! Int
        }
    }
    
    func update(id: Int, item: Category) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Category()
        item.categoryId = id
        try item.delete()
    }
}
