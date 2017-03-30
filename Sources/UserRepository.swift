//
//  UserRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import StORM
import TurnstileCrypto

struct UserRepository : UserProtocol {
    
    public var random: Random = URandom()
	
   	func getAll() throws -> [User] {
        let items = User()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: String) throws -> User? {
        let item = User()
        try item.get(id)
        
        return item
    }
    
    func add(item: User) throws {
        item.uniqueID = String(random.secureToken)
        item.password = BCrypt.hash(password: item.password)
        try item.create()
    }
    
    func update(id: String, item: User) throws {
        
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
        let item = User()
        item.uniqueID = id
        try item.delete()
    }
}
