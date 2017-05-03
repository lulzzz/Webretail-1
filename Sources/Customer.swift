//
//  Customer.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import StORM
import PerfectLib

class Customer: PostgresSqlORM, JSONConvertible {
	
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
	
	public func setJSONValues(_ values:[String:Any]) {
		self.customerId = getJSONValue(named: "customerId", from: values, defaultValue: 0)
		self.customerName = getJSONValue(named: "customerName", from: values, defaultValue: "")
		self.customerEmail = getJSONValue(named: "customerEmail", from: values, defaultValue: "")
		self.customerPhone = getJSONValue(named: "customerPhone", from: values, defaultValue: "")
		self.customerAddress = getJSONValue(named: "customerAddress", from: values, defaultValue: "")
		self.customerCity = getJSONValue(named: "customerCity", from: values, defaultValue: "")
		self.customerZip = getJSONValue(named: "customerZip", from: values, defaultValue: "")
		self.customerCountry = getJSONValue(named: "customerCountry", from: values, defaultValue: "")
		self.customerFiscalCode = getJSONValue(named: "customerFiscalCode", from: values, defaultValue: "")
		self.customerVatNumber = getJSONValue(named: "customerVatNumber", from: values, defaultValue: "")
		self.customerUpdated = getJSONValue(named: "updatedAt", from: values, defaultValue: 0)
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"customerId": customerId,
			"customerName": customerName,
			"customerEmail": customerEmail,
			"customerPhone": customerPhone,
			"customerAddress":	customerAddress,
			"customerCity": customerCity,
			"customerZip": customerZip,
			"customerCountry": customerCountry,
			"customerFiscalCode": customerFiscalCode,
			"customerVatNumber": customerVatNumber,
			"updatedAt": customerUpdated
		]
	}
}
