//
//  BrandRepository.swift
//  PerfectTurnstilePostgreSQLDemo
//
//  Created by Gerardo Grisolini on 16/02/17.
//
//

import StORM

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
        item.created = Helper.now()
        item.updated = Helper.now()
        try item.save {
            id in item.brandId = id as! Int
        }
    }
    
    func update(id: Int, item: Brand) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.brandName = item.brandName
        current.updated = Helper.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Brand()
        item.brandId = id
        try item.delete()
    }
}
