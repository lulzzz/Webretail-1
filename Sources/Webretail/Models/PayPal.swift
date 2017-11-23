//
//  PayPal.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/11/17.
//

struct PayPal: Codable {
    public var env : String = ""
    public var sandbox : String = ""
    public var production : String = ""
    public var currency : String = ""
}
