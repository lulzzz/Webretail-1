//
//  Category.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class Category: PostgresSqlORM, JSONConvertible {
    
    public var categoryId : Int = 0
    public var categoryName : String = ""
    public var categoryIsPrimary : Bool = false
    public var categoryCreated : Int = Int.now()
    public var categoryUpdated : Int = Int.now()
    
    open override func table() -> String { return "categories" }
    open override func tableIndexes() -> [String] { return ["categoryName"] }

    open override func to(_ this: StORMRow) {
        categoryId = this.data["categoryid"] as? Int ?? 0
        categoryName = this.data["categoryname"] as? String  ?? ""
        categoryIsPrimary = this.data["categoryisprimary"] as? Bool ?? true
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
    
    func setJSONValues(_ values:[String:Any]) {
        self.categoryId = getJSONValue(named: "categoryId", from: values, defaultValue: 0)
        self.categoryName = getJSONValue(named: "categoryName", from: values, defaultValue: "")
        self.categoryIsPrimary = getJSONValue(named: "categoryIsPrimary", from: values, defaultValue: false)
    }

    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "categoryId": categoryId,
            "categoryName": categoryName,
            "categoryIsPrimary": categoryIsPrimary
        ]
    }
}
