//
//  ArticleAttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class ArticleAttributeValue: PostgresStORM, JSONConvertible {
    
    public var articleAttributeValueId	: Int = 0
    public var articleId                : Int = 0
    public var productAttributeValueId  : Int = 0
    
    open override func table() -> String { return "articleattributevalues" }
    
    open override func to(_ this: StORMRow) {
        articleAttributeValueId	= this.data["articleattributevalueid"] as? Int  ?? 0
        articleId               = this.data["articleid"] as? Int                ?? 0
        productAttributeValueId = this.data["productattributevalueid"] as? Int  ?? 0
    }
    
    func rows() -> [ArticleAttributeValue] {
        var rows = [ArticleAttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = ArticleAttributeValue()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "articleAttributeValueId": articleAttributeValueId,
            "articleId": articleId,
            "productAttributeValueId": productAttributeValueId
        ]
    }
}
