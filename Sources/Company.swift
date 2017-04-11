//
//  Company.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM
import PerfectLib

class Company: PostgresSqlORM, JSONConvertible {
	
	public var companyName : String = ""
	public var companyDesc : String = ""
	public var companyWebsite : String = ""
	public var companyEmail : String = ""
	public var companyPhone : String = ""
	public var companyFiscalCode : String = ""
	public var companyVatNumber : String = ""
	public var companyAddress : String = ""
	public var companyCity : String = ""
	public var companyCountry : String = ""
	public var companyZip : String = ""
	
	public var smtpServer : String = ""
	public var smtpPort : Int = 0
	public var smtpSsl : Bool = false
	public var smtpUsername : String = ""
	public var smtpPassword : String = ""

	open override func table() -> String { return "company" }
	
	open override func to(_ this: StORMRow) {
		companyName = this.data["companyname"] as? String ?? ""
		companyDesc = this.data["companydesc"] as? String ?? ""
		companyWebsite = this.data["companywebsite"] as? String ?? ""
		companyEmail = this.data["companyemail"] as? String ?? ""
		companyPhone = this.data["companyphone"] as? String ?? ""
		companyFiscalCode = this.data["companyfiscalcode"] as? String ?? ""
		companyVatNumber = this.data["companyvatnumber"] as? String ?? ""
		companyAddress = this.data["companyaddress"] as? String ?? ""
		companyCity = this.data["companycity"] as? String ?? ""
		companyZip = this.data["companyzip"] as? String ?? ""
		companyCountry = this.data["companycountry"] as? String ?? ""

		smtpServer = this.data["smtpserver"] as? String ?? ""
		smtpPort = this.data["smtpport"] as? Int ?? 0
		smtpSsl = this.data["smtpssl"] as? Bool ?? false
		smtpUsername = this.data["smtpusername"] as? String ?? ""
		smtpPassword = this.data["smtppassword"] as? String ?? ""
	}
	
	func rows() -> [Company] {
		var rows = [Company]()
		for i in 0..<self.results.rows.count {
			let row = Company()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.companyName = getJSONValue(named: "companyName", from: values, defaultValue: "")
		self.companyDesc = getJSONValue(named: "companyDesc", from: values, defaultValue: "")
		self.companyWebsite = getJSONValue(named: "companyWebsite", from: values, defaultValue: "")
		self.companyEmail = getJSONValue(named: "companyEmail", from: values, defaultValue: "")
		self.companyPhone = getJSONValue(named: "companyPhone", from: values, defaultValue: "")
		self.companyFiscalCode = getJSONValue(named: "companyFiscalCode", from: values, defaultValue: "")
		self.companyVatNumber = getJSONValue(named: "companyVatNumber", from: values, defaultValue: "")
		self.companyAddress = getJSONValue(named: "companyAddress", from: values, defaultValue: "")
		self.companyCity = getJSONValue(named: "companyCity", from: values, defaultValue: "")
		self.companyZip = getJSONValue(named: "companyZip", from: values, defaultValue: "")
		self.companyCountry = getJSONValue(named: "companyCountry", from: values, defaultValue: "")

		self.smtpServer = getJSONValue(named: "smtpServer", from: values, defaultValue: "")
		self.smtpPort = getJSONValue(named: "smtpPort", from: values, defaultValue: 0)
		self.smtpSsl = getJSONValue(named: "smtpSsl", from: values, defaultValue: false)
		self.smtpUsername = getJSONValue(named: "smtpUsername", from: values, defaultValue: "")
		self.smtpPassword = getJSONValue(named: "smtpPassword", from: values, defaultValue: "")
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"companyName": companyName,
			"companyDesc": companyDesc,
			"companyWebsite": companyWebsite,
			"companyEmail": companyEmail,
			"companyPhone": companyPhone,
			"companyFiscalCode": companyFiscalCode,
			"companyVatNumber": companyVatNumber,
			"companyAddress": companyAddress,
			"companyCity": companyCity,
			"companyZip": companyZip,
			"companyCountry": companyCountry,
			
			"smtpServer": smtpServer,
			"smtpPort": smtpPort,
			"smtpSsl": smtpSsl,
			"smtpUsername": smtpUsername,
			"smtpPassword": smtpPassword
		]
	}
}
