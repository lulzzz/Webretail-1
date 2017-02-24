//
//  AccountProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

protocol AccountProtocol {
    
    func getAll() throws -> [Account]
    
    func get(id: String) throws -> Account?
    
    func add(item: Account) throws
    
    func update(id: String, item: Account) throws
    
    func delete(id: String) throws
}
