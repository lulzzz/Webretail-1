//
//  Article.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Article: PostgresStORM, JSONConvertible {
    
    public var articleId		: Int = 0
    public var productId		: Int = 0
    public var barcode          : String = ""
    public var created          : Int = Helper.now()
    public var updated          : Int = Helper.now()
    
    public var internal_attributeValues: [ArticleAttributeValue] = [ArticleAttributeValue]()

    
    open override func table() -> String { return "articles" }
    
    open override func to(_ this: StORMRow) {
        articleId		= this.data["articleid"] as? Int    ?? 0
        productId		= this.data["productid"] as? Int    ?? 0
        barcode         = this.data["barcode"] as? String   ?? ""
        created         = this.data["created"] as? Int      ?? 0
        updated         = this.data["updated"] as? Int      ?? 0
    }
    
    func rows() throws -> [Article] {
        var rows = [Article]()
        for i in 0..<self.results.rows.count {
            let row = Article()
            row.to(self.results.rows[i])

            // get attributeValues
            let attributeValue = ArticleAttributeValue()
            try attributeValue.find([("articleId", row.articleId)])
            row.internal_attributeValues = try attributeValue.rows()

            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.articleId = Helper.getJSONValue(named: "articleId", from: values, defaultValue: 0)
        self.productId = Helper.getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.barcode = Helper.getJSONValue(named: "barcode", from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "articleId": articleId,
            //"productId": productId,
            "barcode": barcode,
            "attributeValues": internal_attributeValues
            //,"created": Helper.formatDate(unixdate: created)
            //,"updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
