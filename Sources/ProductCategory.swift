//
//  ProductCategory.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class ProductCategory: PostgresStORM, JSONConvertible {
    
    public var productCategoryId	: Int = 0
    public var productId            : Int = 0
    public var categoryId           : Int = 0
    
    open override func table() -> String { return "productcategories" }
    
    open override func to(_ this: StORMRow) {
        productCategoryId	= this.data["productcategoryid"] as? Int    ?? 0
        productId           = this.data["productid"] as? Int            ?? 0
        categoryId          = this.data["categoryid"] as? Int           ?? 0
    }
    
    func rows() -> [ProductCategory] {
        var rows = [ProductCategory]()
        for i in 0..<self.results.rows.count {
            let row = ProductCategory()
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
            "productCategoryId": productCategoryId,
            "productId": productId,
            "categoryId": categoryId
        ]
    }
}
