//
//  Barcode.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 04/11/17.
//

class Barcode: Codable, JsonbProtocol {
    
    public var barcode : String = ""
    public var primaryKey : String = ""
    public var secondaryKey : String = ""
    
//    private enum CodingKeys: String, CodingKey {
//        case barcode
//        case primaryKey
//        case secondaryKey
//    }
}

