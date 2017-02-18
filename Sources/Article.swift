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
    
    open override func table() -> String { return "articles" }
    
    open override func to(_ this: StORMRow) {
        articleId		= this.data["articleid"] as? Int    ?? 0
        productId		= this.data["productid"] as? Int    ?? 0
        barcode         = this.data["barcode"] as? String   ?? ""
        created         = this.data["created"] as? Int      ?? 0
        updated         = this.data["updated"] as? Int      ?? 0
    }
    
    func rows() -> [Article] {
        var rows = [Article]()
        for i in 0..<self.results.rows.count {
            let row = Article()
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
            "articleId": articleId,
            "productId": productId,
            "barcode": barcode
            //,"created": Helper.formatDate(unixdate: created)
            //,"updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
