//
//  Attribute.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class Attribute: PostgresSqlORM, Codable {
    
    public var attributeId	: Int = 0
    public var attributeName : String = ""
    public var attributeTranslates: [Translation] = [Translation]()
    public var attributeCreated : Int = Int.now()
    public var attributeUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case attributeId
        case attributeName
        case attributeTranslates = "translations"
    }

    open override func table() -> String { return "attributes" }
    open override func tableIndexes() -> [String] { return ["attributeName"] }
    
    open override func to(_ this: StORMRow) {
        attributeId = this.data["attributeid"] as? Int ?? 0
        attributeName = this.data["attributename"] as? String ?? ""
        let decoder = JSONDecoder()
        let jsonData = try! JSONSerialization.data(withJSONObject: this.data["attributetranslates"]!, options: [])
        attributeTranslates = try! decoder.decode([Translation].self, from: jsonData)
        attributeCreated = this.data["attributecreated"] as? Int ?? 0
        attributeUpdated = this.data["attributeupdated"] as? Int ?? 0
    }
    
    func rows() -> [Attribute] {
        var rows = [Attribute]()
        for i in 0..<self.results.rows.count {
            let row = Attribute()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }

    override init() {
        super.init()
    }

    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        attributeId = try container.decode(Int.self, forKey: .attributeId)
        attributeName = try container.decode(String.self, forKey: .attributeName)
        attributeTranslates = try container.decodeIfPresent([Translation].self, forKey: .attributeTranslates) ?? [Translation]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(attributeId, forKey: .attributeId)
        try container.encode(attributeName, forKey: .attributeName)
        try container.encode(attributeTranslates, forKey: .attributeTranslates)
    }
}
