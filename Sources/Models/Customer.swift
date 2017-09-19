//
//  Customer.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import StORM

class Customer: PostgresSqlORM, Codable {
	
	public var customerId : Int = 0
	public var customerName	: String = ""
	public var customerEmail : String = ""
	public var customerPhone : String = ""
	public var customerAddress : String = ""
	public var customerCity : String = ""
	public var customerZip : String = ""
	public var customerCountry : String = ""
	public var customerFiscalCode : String = ""
	public var customerVatNumber : String = ""
	public var customerCreated : Int = Int.now()
	public var customerUpdated : Int = Int.now()
	
    private enum CodingKeys: String, CodingKey {
        case customerId
        case customerName
        case customerEmail
        case customerPhone
        case customerAddress
        case customerCity
        case customerZip
        case customerCountry
        case customerFiscalCode
        case customerVatNumber
        case customerUpdated = "updatedAt"
    }
    
    open override func table() -> String { return "customers" }
	open override func tableIndexes() -> [String] { return ["customerName", "customerEmail"] }
	
	open override func to(_ this: StORMRow) {
		customerId = this.data["customerid"] as? Int ?? 0
		customerName = this.data["customername"] as? String ?? ""
		customerEmail = this.data["customeremail"] as? String ?? ""
		customerPhone = this.data["customerphone"] as? String ?? ""
		customerAddress = this.data["customeraddress"] as? String ?? ""
		customerCity = this.data["customercity"] as? String ?? ""
		customerZip = this.data["customerzip"] as? String ?? ""
		customerCountry = this.data["customercountry"] as? String ?? ""
		customerFiscalCode = this.data["customerfiscalcode"] as? String ?? ""
		customerVatNumber = this.data["customervatnumber"] as? String ?? ""
		customerCreated = this.data["customercreated"] as? Int ?? 0
		customerUpdated = this.data["customerupdated"] as? Int ?? 0
	}
	
	func rows() -> [Customer] {
		var rows = [Customer]()
		for i in 0..<self.results.rows.count {
			let row = Customer()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
}
