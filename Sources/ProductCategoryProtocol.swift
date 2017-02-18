//
//  ProductCategoryProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ProductCategoryProtocol {
    
    func getAll() throws -> [ProductCategory]
    
    func get(id: Int) throws -> ProductCategory?
    
    func add(item: ProductCategory) throws
    
    func update(id: Int, item: ProductCategory) throws
    
    func delete(id: Int) throws
}
