//
//  Setting.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 06/12/17.
//

class Setting: Codable {
    
    public var companyId : Int = 0
    public var companyName : String = ""
    public var companyDesc : String = ""
    public var companyEmail : String = ""
    public var companyPhone : String = ""
    public var companyAddress : String = ""
    public var companyCity : String = ""
    public var companyZip : String = ""
    public var companyProvince : String = ""
    public var companyCountry : String = ""
    public var companyFiscalCode : String = ""
    public var companyVatNumber : String = ""

    public var companyWebsite : String = ""
    public var companyCurrency : String = ""
    public var companyUtc : String = ""
    
    public var paypalEnv : String = ""
    public var paypalSandbox : String = ""
    public var paypalProduction : String = ""
}
