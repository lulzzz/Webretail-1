//
//  Translate.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 22/09/17.
//

class Translation: Codable, JsonbProtocol {
    
    public var country : String = ""
    public var key : String = ""
    public var value : String = ""
}

