//
//  BrandRepository.swift
//  PerfectTurnstilePostgreSQLDemo
//
//  Created by Gerardo Grisolini on 16/02/17.
//
//

class BrandRepository : BrandProtocol {
    
    func getAll() throws -> [Brand] {
        let items = Brand()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Brand? {
        let item = Brand()
        try item.get(id)
        
        return item
    }
    
    func add(item: Brand) throws {
        try item.save {
            id in item.brandId = id as! Int
        }
    }
    
    func update(id: Int, item: Brand) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Brand()
        item.brandId = id
        try item.delete()
    }
}
