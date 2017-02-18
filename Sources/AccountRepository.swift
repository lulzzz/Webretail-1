//
//  AccountRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import TurnstileCrypto

class AccountRepository : AccountProtocol {
    
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
        item.password = BCrypt.hash(password: item.password)
        try item.save {
            id in item.uniqueID = id as! String
        }
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
