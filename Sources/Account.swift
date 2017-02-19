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

/// Provides the Account structure for Perfect Turnstile
class Account : PostgresStORM, JSONConvertible {
    
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
    

    /// The table to store the data
    override open func table() -> String {
        return "users"
    }
    
    /// Set incoming data from database to object
    override open func to(_ this: StORMRow) {
        uniqueID	= this.data["uniqueid"] as? String ?? ""
        username	= this.data["username"] as? String ?? ""
        password	= this.data["password"] as? String ?? ""
        firstname	= this.data["firstname"] as? String ?? ""
        lastname	= this.data["lastname"] as? String ?? ""
        email		= this.data["email"] as? String ?? ""
    }
    
    /// Iterate through rows and set to object data
    public func rows() -> [Account] {
        var rows = [Account]()
        for i in 0..<self.results.rows.count {
            let row = Account()
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
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "uniqueID": uniqueID,
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "email": email
        ]
    }
}


