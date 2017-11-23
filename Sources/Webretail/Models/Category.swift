//
//  Category.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class Category: PostgresSqlORM, Codable {
    
    public var categoryId : Int = 0
    public var categoryName : String = ""
    public var categoryIsPrimary : Bool = false
    public var categoryTranslates: [Translation] = [Translation]()
    public var categoryCreated : Int = Int.now()
    public var categoryUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case categoryId
        case categoryName
        case categoryIsPrimary
        case categoryTranslates = "translations"
    }

    open override func table() -> String { return "categories" }
    open override func tableIndexes() -> [String] { return ["categoryName"] }

    open override func to(_ this: StORMRow) {
        categoryId = this.data["categoryid"] as? Int ?? 0
        categoryName = this.data["categoryname"] as? String  ?? ""
        categoryIsPrimary = this.data["categoryisprimary"] as? Bool ?? true
        if let translates = this.data["categorytranslates"] {
            let jsonData = try! JSONSerialization.data(withJSONObject: translates, options: [])
            categoryTranslates = try! JSONDecoder().decode([Translation].self, from: jsonData)
        }
        categoryCreated = this.data["categorycreated"] as? Int ?? 0
        categoryUpdated = this.data["categoryupdated"] as? Int ?? 0
    }
    
    func rows() -> [Category] {
        var rows = [Category]()
        for i in 0..<self.results.rows.count {
            let row = Category()
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
        categoryId = try container.decode(Int.self, forKey: .categoryId)
        categoryName = try container.decode(String.self, forKey: .categoryName)
        categoryIsPrimary = try container.decode(Bool.self, forKey: .categoryIsPrimary)
        categoryTranslates = try container.decodeIfPresent([Translation].self, forKey: .categoryTranslates) ?? [Translation]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(categoryId, forKey: .categoryId)
        try container.encode(categoryName, forKey: .categoryName)
        try container.encode(categoryIsPrimary, forKey: .categoryIsPrimary)
        try container.encode(categoryTranslates, forKey: .categoryTranslates)
    }
}
