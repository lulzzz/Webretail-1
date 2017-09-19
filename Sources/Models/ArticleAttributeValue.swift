//
//  ArticleAttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ArticleAttributeValue: PostgresSqlORM, Codable {
    
    public var articleAttributeValueId : Int = 0
    public var articleId : Int = 0
    public var attributeValueId : Int = 0

    private enum CodingKeys: String, CodingKey {
        case articleId
        case attributeValueId
    }

    open override func table() -> String { return "articleattributevalues" }
    
    open override func to(_ this: StORMRow) {
        articleAttributeValueId = this.data["articleattributevalueid"] as? Int ?? 0
        articleId = this.data["articleid"] as? Int ?? 0
        attributeValueId = this.data["attributevalueid"] as? Int ?? 0
    }
    
    func rows() throws -> [ArticleAttributeValue] {
        var rows = [ArticleAttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = ArticleAttributeValue()
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
        articleId = try container.decodeIfPresent(Int.self, forKey: .articleId) ?? 0
        attributeValueId = try container.decode(Int.self, forKey: .attributeValueId)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(attributeValueId, forKey: .attributeValueId)
    }
}
