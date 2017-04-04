//
//  CatgoryRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct CategoryRepository : CategoryProtocol {

    func getAll() throws -> [Category] {
        let items = Category()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Category? {
        let item = Category()
		try item.query(id: id)
		
        return item
    }
    
    func add(item: Category) throws {
        item.categoryCreated = Int.now()
        item.categoryUpdated = Int.now()
        try item.save {
            id in item.categoryId = id as! Int
        }
    }
    
    func update(id: Int, item: Category) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.categoryName = item.categoryName
        current.categoryIsPrimary = item.categoryIsPrimary
        current.categoryUpdated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Category()
        item.categoryId = id
        try item.delete()
    }
}
