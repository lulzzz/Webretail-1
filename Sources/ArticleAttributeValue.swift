//
//  ArticleAttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class ArticleAttributeValue: PostgresSqlORM, JSONConvertible {
    
    public var articleAttributeValueId : Int = 0
    public var articleId : Int = 0
    public var attributeValueId : Int = 0
    
    public var _attributeValue: AttributeValue = AttributeValue()

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
    
    func setJSONValues(_ values:[String: Any]) {
        //self.articleAttributeValueId = getJSONValue(named: "articleAttributeValueId", from: values, defaultValue: 0)
        self.articleId = getJSONValue(named: "articleId", from: values, defaultValue: 0)
        self.attributeValueId = getJSONValue(named: "attributeValueId",  from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String: Any] {
        return [
            //"articleAttributeValueId": articleAttributeValueId,
            //"articleId": articleId,
            "attributeValueId": attributeValueId,
            //"attributeValue": _attributeValue
        ]
    }
}
