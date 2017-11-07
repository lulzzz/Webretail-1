//
//  Barcode.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 04/11/17.
//

class Barcode: Codable, JsonbProtocol {
    
    public var barcode : String = ""
    public var tags : [Tag] = [Tag]()
}

