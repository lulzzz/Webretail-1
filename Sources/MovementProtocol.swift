//
//  MovementProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

protocol MovementProtocol {
    
    func getAll() throws -> [Movement]
    
    func get(id: Int) throws -> Movement?
    
    func add(item: Movement) throws
    
    func update(id: Int, item: Movement) throws
    
    func delete(id: Int) throws
}
