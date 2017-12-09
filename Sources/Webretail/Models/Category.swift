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
    public var categoryIsPrimary : Bool = false
    public var categoryName : String = ""
    public var categoryDescription: [Translation] = [Translation]()
    public var categoryMedia: Media = Media()
    public var categorySeo : Seo = Seo()
    public var categoryCreated : Int = Int.now()
    public var categoryUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case categoryId
        case categoryIsPrimary
        case categoryName
        case categoryDescription = "translations"
        case categoryMedia = "media"
        case categorySeo = "seo"
    }

    open override func table() -> String { return "categories" }
    open override func tableIndexes() -> [String] { return ["categoryName"] }

    open override func to(_ this: StORMRow) {
        categoryId = this.data["categoryid"] as? Int ?? 0
        categoryIsPrimary = this.data["categoryisprimary"] as? Bool ?? true
        categoryName = this.data["categoryname"] as? String  ?? ""
        let decoder = JSONDecoder()
        var jsonData: Data
        if let translates = this.data["categorydescription"] {
            jsonData = try! JSONSerialization.data(withJSONObject: translates, options: [])
            categoryDescription = try! decoder.decode([Translation].self, from: jsonData)
        }
        if let media = this.data["categorymedia"] {
            jsonData = try! JSONSerialization.data(withJSONObject: media, options: [])
            categoryMedia = try! decoder.decode(Media.self, from: jsonData)
        }
        if let seo = this.data["categoryseo"] {
            jsonData = try! JSONSerialization.data(withJSONObject: seo, options: [])
            categorySeo = try! decoder.decode(Seo.self, from: jsonData)
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
        categoryIsPrimary = try container.decode(Bool.self, forKey: .categoryIsPrimary)
        categoryName = try container.decode(String.self, forKey: .categoryName)
        categoryDescription = try container.decodeIfPresent([Translation].self, forKey: .categoryDescription) ?? [Translation]()
        categoryMedia = try container.decodeIfPresent(Media.self, forKey: .categoryMedia) ?? Media()
        categorySeo = try container.decodeIfPresent(Seo.self, forKey: .categorySeo) ?? Seo()
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(categoryId, forKey: .categoryId)
        try container.encode(categoryIsPrimary, forKey: .categoryIsPrimary)
        try container.encode(categoryName, forKey: .categoryName)
        try container.encode(categoryDescription, forKey: .categoryDescription)
        try container.encode(categoryMedia, forKey: .categoryMedia)
        try container.encode(categorySeo, forKey: .categorySeo)
    }
}
