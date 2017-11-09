//
//  Registry.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import StORM
import Turnstile
import TurnstileCrypto

class Registry: PostgresSqlORM, Codable, Account {
	
    public var registryId : Int = 0
	public var registryName	: String = ""
	public var registryEmail : String = ""
    public var registryPassword : String = ""
	public var registryPhone : String = ""
	public var registryAddress : String = ""
	public var registryCity : String = ""
	public var registryZip : String = ""
	public var registryCountry : String = ""
	public var registryFiscalCode : String = ""
	public var registryVatNumber : String = ""
	public var registryCreated : Int = Int.now()
	public var registryUpdated : Int = Int.now()

    /// The User account's Unique ID
    public var uniqueID: String {
        return registryId.description
    }

    private enum CodingKeys: String, CodingKey {
        case registryId
        case registryName
        case registryEmail
        case registryPhone
        case registryAddress
        case registryCity
        case registryZip
        case registryCountry
        case registryFiscalCode
        case registryVatNumber
        case registryUpdated = "updatedAt"
    }
    
    open override func table() -> String { return "registrys" }
	open override func tableIndexes() -> [String] { return ["registryName", "registryEmail"] }
	
	open override func to(_ this: StORMRow) {
		registryId = this.data["registryid"] as? Int ?? 0
		registryName = this.data["registryname"] as? String ?? ""
		registryEmail = this.data["registryemail"] as? String ?? ""
        registryPassword = this.data["registrypassword"] as? String ?? ""
		registryPhone = this.data["registryphone"] as? String ?? ""
		registryAddress = this.data["registryaddress"] as? String ?? ""
		registryCity = this.data["registrycity"] as? String ?? ""
		registryZip = this.data["registryzip"] as? String ?? ""
		registryCountry = this.data["registrycountry"] as? String ?? ""
		registryFiscalCode = this.data["registryfiscalcode"] as? String ?? ""
		registryVatNumber = this.data["registryvatnumber"] as? String ?? ""
		registryCreated = this.data["registrycreated"] as? Int ?? 0
		registryUpdated = this.data["registryupdated"] as? Int ?? 0
	}
	
	func rows() -> [Registry] {
		var rows = [Registry]()
		for i in 0..<self.results.rows.count {
			let row = Registry()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}

    func get(email: String) throws {
        try query(
            whereclause: "registryEmail = $1",
            params: [email],
            cursor: StORMCursor(limit: 1, offset: 0)
        )
        if self.results.rows.count == 0 {
            throw StORMError.noRecordFound
        }
    }
    
    /// Performs a find on supplied email, and matches hashed password
    open func get(_ email: String, _ pwd: String) throws -> Registry {
        try get(email: email)
        if try BCrypt.verify(password: pwd, matchesHash: registryPassword) {
            return self
        } else {
            throw StORMError.noRecordFound
        }
    }

    /// Returns a true / false depending on if the email exits in the database.
    func exists(_ email: String) -> Bool {
        do {
            try query(whereclause: "registryEmail = $1", params: [email], cursor: StORMCursor(limit: 1, offset: 0))
            if results.rows.count == 1 {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }
}
