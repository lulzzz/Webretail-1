//
//  TagValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import Foundation
import StORM

class TagValue: PostgresSqlORM, Codable {
    
    public var tagValueId : Int = 0
    public var tagGroupId : Int = 0
    public var tagValueCode : String = ""
    public var tagValueName : String = ""
    public var tagValueTranslates: [Translation] = [Translation]()
    public var tagValueCreated : Int = Int.now()
    public var tagValueUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case tagValueId
        case tagGroupId
        case tagValueCode
        case tagValueName
        case tagValueTranslates = "translations"
    }
    
    open override func table() -> String { return "tagvalues" }
    open override func tableIndexes() -> [String] { return ["tagValueCode"] }
    
    open override func to(_ this: StORMRow) {
        tagValueId    = this.data["tagvalueid"] as? Int ?? 0
        tagGroupId = this.data["taggroupid"] as? Int ?? 0
        tagValueCode = this.data["tagvaluecode"] as? String ?? ""
        tagValueName = this.data["tagvaluename"] as? String ?? ""
        if let translates = this.data["tagvaluetranslates"] as? Data {
            let decoder = JSONDecoder()
            tagValueTranslates = try! decoder.decode([Translation].self, from: translates)
        }
        tagValueCreated = this.data["tagvaluecreated"] as? Int ?? 0
        tagValueUpdated = this.data["tagvalueupdated"] as? Int ?? 0
    }
    
    func rows() -> [TagValue] {
        var rows = [TagValue]()
        for i in 0..<self.results.rows.count {
            let row = TagValue()
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
        tagValueId = try container.decode(Int.self, forKey: .tagValueId)
        tagGroupId = try container.decode(Int.self, forKey: .tagGroupId)
        tagValueCode = try container.decode(String.self, forKey: .tagValueCode)
        tagValueName = try container.decode(String.self, forKey: .tagValueName)
        tagValueTranslates = try container.decodeIfPresent([Translation].self, forKey: .tagValueTranslates) ?? [Translation]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(tagValueId, forKey: .tagValueId)
        try container.encode(tagGroupId, forKey: .tagGroupId)
        try container.encode(tagValueCode, forKey: .tagValueCode)
        try container.encode(tagValueName, forKey: .tagValueName)
        try container.encode(tagValueTranslates, forKey: .tagValueTranslates)
    }
}

