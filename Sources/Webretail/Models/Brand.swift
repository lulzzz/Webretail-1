//
//  Brand.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class Brand: PostgresSqlORM, Codable {
    
    public var brandId : Int = 0
    public var brandName : String = ""
    public var brandDescription: [Translation] = [Translation]()
    public var brandMedia: Media = Media()
    public var brandSeo : Seo = Seo()
    public var brandCreated : Int = Int.now()
    public var brandUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case brandId
        case brandName
        case brandDescription = "translations"
        case brandMedia = "media"
        case brandSeo = "seo"
    }

    open override func table() -> String { return "brands" }
    open override func tableIndexes() -> [String] { return ["brandName"] }

    open override func to(_ this: StORMRow) {
        brandId = this.data["brandid"] as? Int ?? 0
        brandName = this.data["brandname"] as? String ?? ""
        let decoder = JSONDecoder()
        var jsonData: Data
        if let descriptions = this.data["branddescription"] {
            jsonData = try! JSONSerialization.data(withJSONObject: descriptions, options: [])
            brandDescription = try! decoder.decode([Translation].self, from: jsonData)
        }
        if let media = this.data["brandmedia"] {
            jsonData = try! JSONSerialization.data(withJSONObject: media, options: [])
            brandMedia = try! decoder.decode(Media.self, from: jsonData)
        }
        if let seo = this.data["brandseo"] {
            jsonData = try! JSONSerialization.data(withJSONObject: seo, options: [])
            brandSeo = try! decoder.decode(Seo.self, from: jsonData)
        }
        brandCreated = this.data["brandcreated"] as? Int ?? 0
        brandUpdated = this.data["brandupdated"] as? Int ?? 0
    }
    
    func rows() -> [Brand] {
        var rows = [Brand]()
        for i in 0..<self.results.rows.count {
            let row = Brand()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }

//    override init() {
//        super.init()
//    }
//    
//    required init(from decoder: Decoder) throws {
//        super.init()
//        
//        let container = try decoder.container(keyedBy: CodingKeys.self)
//        brandId = try container.decode(Int.self, forKey: .brandId)
//        brandName = try container.decode(String.self, forKey: .brandName)
//        brandDescription = try container.decodeIfPresent([Translation].self, forKey: .brandDescription) ?? [Translation]()
//        brandMedia = try container.decodeIfPresent(Media.self, forKey: .brandMedia) ?? Media()
//        brandSeo = try container.decodeIfPresent(Seo.self, forKey: .brandSeo) ?? Seo()
//    }
//    
//    func encode(to encoder: Encoder) throws {
//        var container = encoder.container(keyedBy: CodingKeys.self)
//        try container.encode(brandId, forKey: .brandId)
//        try container.encode(brandName, forKey: .brandName)
//        try container.encode(brandDescription, forKey: .brandDescription)
//        try container.encode(brandMedia, forKey: .brandMedia)
//        try container.encode(brandSeo, forKey: .brandSeo)
//    }
}
