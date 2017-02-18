//
//  ProductAttributeValueProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ProductAttributeValueProtocol {
    
    func getAll() throws -> [ProductAttributeValue]
    
    func get(id: Int) throws -> ProductAttributeValue?
    
    func add(item: ProductAttributeValue) throws
    
    func update(id: Int, item: ProductAttributeValue) throws
    
    func delete(id: Int) throws
}
