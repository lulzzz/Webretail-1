//
//  AccountRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import StORM
import TurnstileCrypto

class AccountRepository : AccountProtocol {
    
   public var random: Random = URandom()
   
   func getAll() throws -> [Account] {
        let items = Account()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: String) throws -> Account? {
        let item = Account()
        try item.get(id)
        
        return item
    }
    
    func add(item: Account) throws {
        item.uniqueID = String(random.secureToken)
        item.password = BCrypt.hash(password: item.password)
        try item.create()
    }
    
    func update(id: String, item: Account) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.firstname = item.firstname
        current.lastname = item.lastname
        current.username = item.username
        if (item.password.length < 20) {
            current.password = BCrypt.hash(password: item.password)
        }
        current.email = item.email
        
        try current.save()
    }
    
    func delete(id: String) throws {
        let item = Account()
        item.uniqueID = id
        try item.delete()
    }
}
