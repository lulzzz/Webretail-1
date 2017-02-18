//
//  Category.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Category: PostgresStORM, JSONConvertible {
    
    public var categoryId		: Int = 0
    public var categoryName		: String = ""
    public var isPrimary        : Bool = false
    public var created          : Int = Helper.now()
    public var updated          : Int = Helper.now()
    
    open override func table() -> String { return "categories" }
    
    open override func to(_ this: StORMRow) {
        categoryId		= this.data["categoryid"] as? Int       ?? 0
        categoryName	= this.data["categoryname"] as? String  ?? ""
        isPrimary       = this.data["isprimary"] as? Bool       ?? false
        created         = this.data["created"] as? Int          ?? 0
        updated         = this.data["updated"] as? Int          ?? 0
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
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "categoryId": categoryId,
            "categoryName": categoryName,
            "isPrimary": isPrimary
            //,"created": Helper.formatDate(unixdate: created)
            //,"updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
