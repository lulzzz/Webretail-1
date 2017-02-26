//
//  Account.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib
import Turnstile
import TurnstileCrypto

/// Provides the Account structure for Perfect Turnstile
class User : PostgresSqlORM, Account, JSONConvertible {
    
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
    public var facebookID: String = ""
    
    /// Stored Google ID when logging in with Google
    public var googleID: String = ""

    /// Is Administrator
    public var isAdmin: Bool = false

    
    /// The table to store the data
    override open func table() -> String {
        return "users"
    }
    
    /// Set incoming data from database to object
    override open func to(_ this: StORMRow) {
        uniqueID	= this.data["uniqueid"]     as? String ?? ""
        username	= this.data["username"]     as? String ?? ""
        password	= this.data["password"]     as? String ?? ""
        firstname	= this.data["firstname"]    as? String ?? ""
        lastname	= this.data["lastname"]     as? String ?? ""
        email		= this.data["email"]        as? String ?? ""
        isAdmin     = this.data["isadmin"]      as? Bool ?? false
        facebookID	= this.data["facebookid"]   as? String ?? ""
        googleID	= this.data["googleid"]     as? String ?? ""
    }
    
    /// Iterate through rows and set to object data
    public func rows() -> [User] {
        var rows = [User]()
        for i in 0..<self.results.rows.count {
            let row = User()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }

    public func setJSONValues(_ values:[String:Any]) {
        self.uniqueID = Helper.getJSONValue(named: "uniqueID", from: values, defaultValue: "")
        self.username = Helper.getJSONValue(named: "username", from: values, defaultValue: "")
        self.password = Helper.getJSONValue(named: "password", from: values, defaultValue: "")
        self.firstname = Helper.getJSONValue(named: "firstname", from: values, defaultValue: "")
        self.lastname = Helper.getJSONValue(named: "lastname", from: values, defaultValue: "")
        self.email = Helper.getJSONValue(named: "email", from: values, defaultValue: "")
        self.isAdmin = Helper.getJSONValue(named: "isAdmin", from: values, defaultValue: false)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "uniqueID": uniqueID,
            "facebookID": facebookID,
            "googleID": googleID,
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "isAdmin": isAdmin
        ]
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
            print(error)
        }
    }
    
    
    /// Performs a find on supplied username, and matches hashed password
    open func get(_ un: String, _ pw: String) throws -> User {
        let cursor = StORMCursor(limit: 1, offset: 0)
        do {
            try select(whereclause: "username = $1", params: [un], orderby: [], cursor: cursor)
            if self.results.rows.count == 0 {
                throw StORMError.noRecordFound
            }
            to(self.results.rows[0])
        } catch {
            print(error)
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
            try select(whereclause: "username = $1", params: [un], orderby: [], cursor: StORMCursor(limit: 1, offset: 0))
            if results.rows.count == 1 {
                return true
            } else {
                return false
            }
        } catch {
            print("Exists error: \(error)")
            return false
        }
    }
}


