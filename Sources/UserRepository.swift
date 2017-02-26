//
//  AccountRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import StORM
import TurnstileCrypto

class UserRepository : UserProtocol {
    
    public var random: Random = URandom()
   
    init() {
        
        // Connect the AccessTokenStore
        let tokenStore = AccessTokenStore()
        try? tokenStore.setup()
        
        // Set up the Authentication table
        let user = User()
        try? user.setup()
        
        do {
            try user.select(whereclause: "isadmin = $1", params: [true], orderby: [], cursor: StORMCursor(limit: 1, offset: 0))
            
            if user.results.rows.count == 0 {
                if user.exists("admin") {
                    user.isAdmin = true
                    try update(id: user.uniqueID, item: user)
                }
                else {
                    user.firstname = "Administrator"
                    user.username = "admin"
                    user.password = "admin"
                    user.isAdmin = true
                    try add(item: user)
                }
            }
        } catch {
            print("Create admin error: \(error)")
        }
    }
    
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
