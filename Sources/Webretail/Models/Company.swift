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
	public var companyWebsite : String = ""
	public var companyAddress : String = ""
	public var companyCity : String = ""
	public var companyZip : String = ""
    public var companyProvince : String = ""
    public var companyCountry : String = ""
    public var companyVatNumber : String = ""
    
    public var companyDescription: [Translation] = [Translation]()

    public var companyPhone : String = ""
    public var companyEmailInfo : String = ""
    public var companyEmailSales : String = ""
    public var companyEmailSupport : String = ""
    
    public var companyCurrency : String = ""
    public var companyUtc : String = ""
    public var companyLocales : [Translation] = [Translation]()

    public var barcodeCounter : UInt64 = 1000000000001

    public var smtpHost : String = ""
	public var smtpSsl : Bool = false
	public var smtpUsername : String = ""
	public var smtpPassword : String = ""

    public var bankName : String = ""
    public var bankIban : String = ""
    public var paypalEnv : String = ""
    public var paypalSandbox : String = ""
    public var paypalProduction : String = ""
    public var cashOnDelivery : Bool = false

    public var shippingStandard : Bool = false
    public var shippingExpress : Bool = false

    open override func table() -> String { return "company" }
	
	open override func to(_ this: StORMRow) {
		companyId = this.data["companyid"] as? Int ?? 0
		companyName = this.data["companyname"] as? String ?? ""
		companyWebsite = this.data["companywebsite"] as? String ?? ""
		companyAddress = this.data["companyaddress"] as? String ?? ""
		companyCity = this.data["companycity"] as? String ?? ""
		companyZip = this.data["companyzip"] as? String ?? ""
        companyProvince = this.data["companyprovince"] as? String ?? ""
        companyCountry = this.data["companycountry"] as? String ?? ""
        companyVatNumber = this.data["companyvatnumber"] as? String ?? ""

        let decoder = JSONDecoder()
        var jsonData: Data
        if let descriptions = this.data["companydescription"] {
            jsonData = try! JSONSerialization.data(withJSONObject: descriptions, options: [])
            companyDescription = try! decoder.decode([Translation].self, from: jsonData)
        }

        barcodeCounter = UInt64(this.data["barcodecounter"] as! String) ?? barcodeCounter

        companyPhone = this.data["companyphone"] as? String ?? ""
        companyEmailInfo = this.data["companyemailinfo"] as? String ?? ""
        companyEmailSales = this.data["companyemailsales"] as? String ?? ""
        companyEmailSupport = this.data["companyemailsupport"] as? String ?? ""
        
        companyCurrency = this.data["companycurrency"] as? String ?? ""
        companyUtc = this.data["companyutc"] as? String ?? ""
        if let locales = this.data["companylocales"] {
            jsonData = try! JSONSerialization.data(withJSONObject: locales, options: [])
            companyLocales = try! decoder.decode([Translation].self, from: jsonData)
        }

		smtpHost = this.data["smtphost"] as? String ?? ""
		smtpSsl = this.data["smtpssl"] as? Bool ?? false
		smtpUsername = this.data["smtpusername"] as? String ?? ""
		smtpPassword = this.data["smtppassword"] as? String ?? ""

        cashOnDelivery = this.data["cashondelivery"] as? Bool ?? false
        paypalEnv = this.data["paypalenv"] as? String ?? ""
        paypalSandbox = this.data["paypalsandbox"] as? String ?? ""
        paypalProduction = this.data["paypalproduction"] as? String ?? ""
        bankName = this.data["bankname"] as? String ?? ""
        bankIban = this.data["bankiban"] as? String ?? ""

        shippingStandard = this.data["shippingstandard"] as? Bool ?? false
        shippingExpress = this.data["shippingexpress"] as? Bool ?? false
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
