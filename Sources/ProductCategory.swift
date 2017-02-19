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
    
    public var internal_category: Category = Category()

    
    open override func table() -> String { return "productcategories" }
    
    open override func to(_ this: StORMRow) {
        productCategoryId	= this.data["productcategoryid"] as? Int    ?? 0
        productId           = this.data["productid"] as? Int            ?? 0
        categoryId          = this.data["categoryid"] as? Int           ?? 0
    }
    
    func rows() throws -> [ProductCategory] {
        var rows = [ProductCategory]()
        for i in 0..<self.results.rows.count {
            let row = ProductCategory()
            row.to(self.results.rows[i])
            
            // get value
            let category = Category()
            try category.get(row.categoryId)
            row.internal_category = category
            
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        //self.productCategoryId = Helper.getJSONValue(named: "productCategoryId", from: values, defaultValue: 0)
        self.productId = Helper.getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.categoryId = Helper.getJSONValue(named: "categoryId", from: values["category"] as! [String : Any], defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            //"productCategoryId": productCategoryId,
            //"productId": productId,
            //"categoryId": categoryId,
            "category": internal_category
        ]
    }
}
