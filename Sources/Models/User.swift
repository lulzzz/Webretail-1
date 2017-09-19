//
//  Account.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import StORM
import PerfectLogger
import Turnstile
import TurnstileCrypto

/// Provides the Account structure for Perfect Turnstile
class User : PostgresSqlORM, Codable, Account {
    
    /// The User account's Unique ID
    public var uniqueID: String = ""
    
    /// The username with which the user will log in with
    public var username: String = ""
    
    /// The password to be set for the user
    public var password: String = ""
    
    /// Optional first name
    public var firstname: String = ""
    
    /// Optional last name
    public var lastname: String = ""
    
    /// Optional email
    public var email: String = ""
    
	/// Stored Facebook ID when logging in with Facebook
    //public var facebookID: String = ""
    
    /// Stored Google ID when logging in with Google
    //public var googleID: String = ""

    /// Is Administrator
    public var isAdmin: Bool = false

    private enum CodingKeys: String, CodingKey {
        case uniqueID
//        case facebookID
//        case googleID
        case username
        case password
        case firstname
        case lastname
        case email
        case isAdmin
    }

    /// The table to store the data
    override open func table() -> String { return "users" }
    open override func tableIndexes() -> [String] { return ["uniqueID", "username", "email"] }
    
    /// Set incoming data from database to object
    override open func to(_ this: StORMRow) {
        uniqueID = this.data["uniqueid"] as? String ?? ""
        username = this.data["username"] as? String ?? ""
        password = this.data["password"] as? String ?? ""
        firstname = this.data["firstname"] as? String ?? ""
        lastname = this.data["lastname"] as? String ?? ""
        email	 = this.data["email"] as? String ?? ""
        isAdmin = this.data["isadmin"] as? Bool ?? false
//        facebookID = this.data["facebookid"] as? String ?? ""
//        googleID = this.data["googleid"] as? String ?? ""
    }
    
    /// Iterate through rows and set to object data
    func rows() -> [User] {
        var rows = [User]()
        for i in 0..<self.results.rows.count {
            let row = User()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    /// Shortcut to store the id
    public func id(_ newid: String) {
        uniqueID = newid
    }

    /// Forces a create with a hashed password
    func make() throws {
        do {
            password = BCrypt.hash(password: password)
            try create() // can't use save as the id is populated
        } catch {
            LogFile.error("\(error)")
        }
    }
    
    
    /// Performs a find on supplied username, and matches hashed password
    open func get(_ un: String, _ pw: String) throws -> User {
        do {
            try query(whereclause: "username = $1", params: [un], cursor: StORMCursor(limit: 1, offset: 0))
            if self.results.rows.count == 0 {
                throw StORMError.noRecordFound
            }
            //to(self.results.rows[0])
        } catch {
            LogFile.error("\(error)")
            throw StORMError.noRecordFound
        }
        if try BCrypt.verify(password: pw, matchesHash: password) {
            return self
        } else {
            throw StORMError.noRecordFound
        }
    }
    
    /// Returns a true / false depending on if the username exits in the database.
    func exists(_ un: String) -> Bool {
        do {
            try query(whereclause: "username = $1", params: [un], cursor: StORMCursor(limit: 1, offset: 0))
            if results.rows.count == 1 {
                return true
            } else {
                return false
            }
        } catch {
            LogFile.error("\(error)")
            return false
        }
    }

	func setAdmin() throws {
		do {
			try query(whereclause: "isadmin = $1", params: [true], orderby: [], cursor: StORMCursor(limit: 1, offset: 0))
			
			if results.rows.count == 0 {
				if exists("admin") {
					isAdmin = true
					try save()
				}
				else {
					let random: Random = URandom()
					uniqueID = random.secureToken
					firstname = "Administrator"
					username = "admin"
					password = "admin"
					isAdmin = true
					try make()				}
			}
		} catch {
            LogFile.error("\(error)")
		}
	}
}


