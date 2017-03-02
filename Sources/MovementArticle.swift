//
//  MovementArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class MovementArticle: PostgresSqlORM, JSONConvertible {
    
    public var movementArticleId : Int = 0
    public var movementId : Int = 0
    public var articleId : Int = 0
    public var quantity : Double = 0
    public var created : Int = Int.now()
    public var updated : Int = Int.now()
    
    open override func table() -> String { return "movementarticles" }
    
    open override func to(_ this: StORMRow) {
        movementArticleId = this.data["movementarticleid"] as? Int ?? 0
        movementId = this.data["movementid"] as? Int ?? 0
        articleId = this.data["articleid"] as? Int ?? 0
        quantity = Double(this.data["quantity"] as? Float ?? 0)
        created = this.data["created"] as? Int ?? 0
        updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() -> [MovementArticle] {
        var rows = [MovementArticle]()
        for i in 0..<self.results.rows.count {
            let row = MovementArticle()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.movementArticleId = getJSONValue(named: "movementArticleId", from: values, defaultValue: 0)
        self.movementId = getJSONValue(named: "movementId", from: values, defaultValue: 0)
        self.articleId = getJSONValue(named: "articleId", from: values, defaultValue: 0)
        self.quantity = getJSONValue(named: "quantity", from: values, defaultValue: 0)
        self.created = getJSONValue(named: "created", from: values, defaultValue: 0)
        self.updated = getJSONValue(named: "updated", from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementArticleId": movementArticleId,
            "movementId": movementId,
            "articleId": articleId,
            "quantity": quantity,
            "created": created.formatDate(),
            "updated": updated.formatDate()
        ]
    }
}
