//
//  ProductCategory.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class ProductCategory: PostgresSqlORM, JSONConvertible {
    
    public var productCategoryId : Int = 0
    public var productId : Int = 0
    public var categoryId : Int = 0
    
    public var _category: Category = Category()

    open override func table() -> String { return "productcategories" }
    
    open override func to(_ this: StORMRow) {
        productCategoryId	= this.data["productcategoryid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
        categoryId = this.data["categoryid"] as? Int ?? 0
    }
    
    func rows() throws -> [ProductCategory] {
        var rows = [ProductCategory]()
        for i in 0..<self.results.rows.count {
            let row = ProductCategory()
            row.to(self.results.rows[i])
			row._category.to(self.results.rows[i])
			
			rows.append(row)
        }
        return rows
    }
    
    func setJSONValues(_ values:[String:Any]) {
        //self.productCategoryId = getJSONValue(named: "productCategoryId", from: values, defaultValue: 0)
        self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.categoryId = getJSONValue(named: "categoryId", from: values["category"] as! [String : Any], defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            //"productCategoryId": productCategoryId,
            "productId": productId,
            //"categoryId": categoryId,
            "category": _category
        ]
    }
}
