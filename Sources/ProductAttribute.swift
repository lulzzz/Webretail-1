//
//  ProductAttribute.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class ProductAttribute: PostgresStORM, JSONConvertible {
    
    public var productAttributeId	: Int = 0
    public var productId            : Int = 0
    public var attributeId          : Int = 0
    
    open override func table() -> String { return "productattributes" }
    
    open override func to(_ this: StORMRow) {
        productAttributeId	= this.data["productattributeid"] as? Int   ?? 0
        productId           = this.data["productid"] as? Int            ?? 0
        attributeId         = this.data["attributeid"] as? Int          ?? 0
    }
    
    func rows() -> [ProductAttribute] {
        var rows = [ProductAttribute]()
        for i in 0..<self.results.rows.count {
            let row = ProductAttribute()
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
            "productAttributeId": productAttributeId,
            "productId": productId,
            "attributeId": attributeId
        ]
    }
}
