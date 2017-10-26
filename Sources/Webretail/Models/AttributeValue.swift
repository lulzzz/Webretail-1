//
//  AttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class AttributeValue: PostgresSqlORM, Codable {
    
    public var attributeValueId : Int = 0
	public var attributeId : Int = 0
    public var attributeValueCode	: String = ""
    public var attributeValueName : String = ""
    public var attributeValueTranslates: [Translation] = [Translation]()
    public var attributeValueCreated : Int = Int.now()
    public var attributeValueUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case attributeValueId
        case attributeId
        case attributeValueCode
        case attributeValueName
        case attributeValueTranslates = "translations"
    }

    open override func table() -> String { return "attributevalues" }
    open override func tableIndexes() -> [String] { return ["attributeValueCode", "attributeValueName"] }

    open override func to(_ this: StORMRow) {
        attributeValueId	= this.data["attributevalueid"] as? Int ?? 0
		attributeId = this.data["attributeid"] as? Int ?? 0
        attributeValueCode = this.data["attributevaluecode"] as? String ?? ""
        attributeValueName = this.data["attributevaluename"] as? String ?? ""
        if let translates = this.data["attributevaluetranslates"] {
            let decoder = JSONDecoder()
            let jsonData = try! JSONSerialization.data(withJSONObject: translates, options: [])
            attributeValueTranslates = try! decoder.decode([Translation].self, from: jsonData)
        }
        attributeValueCreated = this.data["attributevaluecreated"] as? Int ?? 0
        attributeValueUpdated = this.data["attributevalueupdated"] as? Int ?? 0
    }
    
    func rows() -> [AttributeValue] {
        var rows = [AttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = AttributeValue()
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
        attributeValueId = try container.decode(Int.self, forKey: .attributeValueId)
        attributeId = try container.decode(Int.self, forKey: .attributeId)
        attributeValueCode = try container.decode(String.self, forKey: .attributeValueCode)
        attributeValueName = try container.decode(String.self, forKey: .attributeValueName)
        attributeValueTranslates = try container.decodeIfPresent([Translation].self, forKey: .attributeValueTranslates) ?? [Translation]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(attributeValueId, forKey: .attributeValueId)
        try container.encode(attributeId, forKey: .attributeId)
        try container.encode(attributeValueCode, forKey: .attributeValueCode)
        try container.encode(attributeValueName, forKey: .attributeValueName)
        try container.encode(attributeValueTranslates, forKey: .attributeValueTranslates)
    }
}
