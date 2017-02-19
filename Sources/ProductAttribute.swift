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
    
    public var internal_attribute: Attribute = Attribute()
    public var internal_attributeValues: [ProductAttributeValue] = [ProductAttributeValue]()

    
    open override func table() -> String { return "productattributes" }
    
    open override func to(_ this: StORMRow) {
        productAttributeId	= this.data["productattributeid"] as? Int   ?? 0
        productId           = this.data["productid"] as? Int            ?? 0
        attributeId         = this.data["attributeid"] as? Int          ?? 0
    }
    
    func rows() throws -> [ProductAttribute] {
        var rows = [ProductAttribute]()
        for i in 0..<self.results.rows.count {
            let row = ProductAttribute()
            row.to(self.results.rows[i])

            // get attribute
            let attribute = Attribute()
            try attribute.get(row.attributeId)
            row.internal_attribute = attribute

            // get attributeValues
            let attributeValue = ProductAttributeValue()
            try attributeValue.find([("productAttributeId",row.productAttributeId)])
            row.internal_attributeValues = try attributeValue.rows()
            
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        //self.productAttributeId = Helper.getJSONValue(named: "productAttributeId", from: values, defaultValue: 0)
        self.productId = Helper.getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.attributeId = Helper.getJSONValue(named: "attributeId", from: values["attribute"] as! [String : Any], defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "productAttributeId": productAttributeId,
            //"productId": productId,
            //"attributeId": attributeId,
            "attribute": internal_attribute,
            "attributeValues": internal_attributeValues
        ]
    }
}
