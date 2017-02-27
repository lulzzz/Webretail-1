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

class ArticleAttributeValue: PostgresSqlORM, JSONConvertible {
    
    public var articleAttributeValueId	: Int = 0
    public var articleId                : Int = 0
    public var productAttributeValueId  : Int = 0
    
//    public var _productAttributeValue: ProductAttributeValue = ProductAttributeValue()

    open override func table() -> String { return "articleattributevalues" }
    
    open override func to(_ this: StORMRow) {
        articleAttributeValueId	= this.data["articleattributevalueid"] as? Int  ?? 0
        articleId               = this.data["articleid"] as? Int                ?? 0
        productAttributeValueId = this.data["productattributevalueid"] as? Int  ?? 0
    }
    
    func rows() throws -> [ArticleAttributeValue] {
        var rows = [ArticleAttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = ArticleAttributeValue()
            row.to(self.results.rows[i])
            
//            // get productAttributeValue
//            let productAttributeValue = ProductAttributeValue()
//            try productAttributeValue.get(row.productAttributeValueId)
//            row._productAttributeValue = productAttributeValue
            
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.articleAttributeValueId =  getJSONValue(named: "articleAttributeValueId",  from: values, defaultValue: 0)
        self.articleId =                getJSONValue(named: "articleId",                from: values, defaultValue: 0)
        self.productAttributeValueId =  getJSONValue(named: "productAttributeValueId",  from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            //"articleAttributeValueId": articleAttributeValueId,
            //"articleId": articleId,
            "productAttributeValueId": productAttributeValueId,
            //"productAttributeValue": _productAttributeValue
        ]
    }
}
