//
//  Seo.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 29/11/17.
//

class Seo: Codable, JsonbProtocol {
    public var permalink : String = ""
    public var title : [Translation] = [Translation]()
    public var description : [Translation] = [Translation]()
}

