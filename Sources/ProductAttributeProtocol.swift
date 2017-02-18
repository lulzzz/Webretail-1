//
//  ProductAttributeProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ProductAttributeProtocol {
    
    func getAll() throws -> [ProductAttribute]
    
    func get(id: Int) throws -> ProductAttribute?
    
    func add(item: ProductAttribute) throws
    
    func update(id: Int, item: ProductAttribute) throws
    
    func delete(id: Int) throws
}
