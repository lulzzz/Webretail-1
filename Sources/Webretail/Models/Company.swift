//
//  Company.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import Foundation
import StORM

class Company: PostgresSqlORM, Codable {
	
	public var companyId : Int = 0
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
    public var companyCurrency : String = ""

	public var smtpHost : String = ""
	public var smtpSsl : Bool = false
	public var smtpUsername : String = ""
	public var smtpPassword : String = ""

    public var paypalEnv : String = ""
    public var paypalSandbox : String = ""
    public var paypalProduction : String = ""

    public var barcodeCounter : UInt64 = 1000000000001

    open override func table() -> String { return "company" }
	
	open override func to(_ this: StORMRow) {
		companyId = this.data["companyid"] as? Int ?? 0
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
        companyCurrency = this.data["companycurrency"] as? String ?? ""

		smtpHost = this.data["smtphost"] as? String ?? ""
		smtpSsl = this.data["smtpssl"] as? Bool ?? false
		smtpUsername = this.data["smtpusername"] as? String ?? ""
		smtpPassword = this.data["smtppassword"] as? String ?? ""

        paypalEnv = this.data["paypalenv"] as? String ?? ""
        paypalSandbox = this.data["paypalsandbox"] as? String ?? ""
        paypalProduction = this.data["paypalproduction"] as? String ?? ""

        barcodeCounter = UInt64(this.data["barcodecounter"] as! String) ?? barcodeCounter
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
}
