//
//  ProductProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ProductProtocol {
    
    func getAll() throws -> [Product]
    
    func get(id: Int) throws -> Product?
    
    func add(item: Product) throws
    
    func update(id: Int, item: Product) throws
    
    func delete(id: Int) throws
}
