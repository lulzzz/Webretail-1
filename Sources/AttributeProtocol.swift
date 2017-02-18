//
//  AttributeProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol AttributeProtocol {
    
    func getAll() throws -> [Attribute]
    
    func get(id: Int) throws -> Attribute?
    
    func add(item: Attribute) throws
    
    func update(id: Int, item: Attribute) throws
    
    func delete(id: Int) throws
}
