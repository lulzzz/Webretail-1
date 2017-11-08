//
//  TagGroup.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import Foundation
import StORM

class TagGroup: PostgresSqlORM, Codable {
    
    public var tagGroupId    : Int = 0
    public var tagGroupName : String = ""
    public var tagGroupTranslates: [Translation] = [Translation]()
    public var tagGroupCreated : Int = Int.now()
    public var tagGroupUpdated : Int = Int.now()
    
    public var _values: [TagValue] = [TagValue]()

    
    private enum CodingKeys: String, CodingKey {
        case tagGroupId
        case tagGroupName
        case tagGroupTranslates = "translations"
        case _values = "values"
    }
    
    open override func table() -> String { return "taggroups" }
    open override func tableIndexes() -> [String] { return ["tagGroupName"] }
    
    open override func to(_ this: StORMRow) {
        tagGroupId = this.data["taggroupid"] as? Int ?? 0
        tagGroupName = this.data["taggroupname"] as? String ?? ""
        if let translates = this.data["taggrouptranslates"] as? [String:Any] {
            let jsonData = try! JSONSerialization.data(withJSONObject: translates, options: [])
            tagGroupTranslates = try! JSONDecoder().decode([Translation].self, from: jsonData)
        }
        tagGroupCreated = this.data["taggroupcreated"] as? Int ?? 0
        tagGroupUpdated = this.data["taggroupupdated"] as? Int ?? 0
    }
    
    func rows() -> [TagGroup] {
        var rows = [TagGroup]()
        for i in 0..<self.results.rows.count {
            let row = TagGroup()
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
        tagGroupId = try container.decode(Int.self, forKey: .tagGroupId)
        tagGroupName = try container.decode(String.self, forKey: .tagGroupName)
        tagGroupTranslates = try container.decodeIfPresent([Translation].self, forKey: .tagGroupTranslates) ?? [Translation]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(tagGroupId, forKey: .tagGroupId)
        try container.encode(tagGroupName, forKey: .tagGroupName)
        try container.encode(tagGroupTranslates, forKey: .tagGroupTranslates)
        try container.encodeIfPresent(_values, forKey: ._values)
    }
}

