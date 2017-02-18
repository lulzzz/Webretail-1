//
//  AccountRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

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
        try item.make()
    }
    
    func update(id: String, item: Account) throws {
        if (item.password.length < 20) {
            item.password = BCrypt.hash(password: item.password)
        }
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: String) throws {
        let item = Account()
        item.uniqueID = id
        try item.delete()
    }
}
