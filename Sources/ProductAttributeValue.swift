//
//  ProductAttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class ProductAttributeValue: PostgresSqlORM, JSONConvertible {
    
    public var productAttributeValueId	: Int = 0
    public var productAttributeId : Int = 0
    public var attributeValueId : Int = 0
    
    public var _attributeValue: AttributeValue = AttributeValue()

    open override func table() -> String { return "productattributevalues" }
    
    open override func to(_ this: StORMRow) {
        productAttributeValueId	= this.data["productattributevalueid"] as? Int ?? 0
        productAttributeId = this.data["productattributeid"] as? Int ?? 0
        attributeValueId = this.data["attributevalueid"] as? Int ?? 0
    }
    
    func rows() throws -> [ProductAttributeValue] {
        var rows = [ProductAttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = ProductAttributeValue()
            row.to(self.results.rows[i])
            row._attributeValue.to(self.results.rows[i])
  
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        //self.productAttributeValueId = getJSONValue(named: "productAttributeValueId", from: values, defaultValue: 0)
        self.productAttributeId = getJSONValue(named: "productAttributeId", from: values, defaultValue: 0)
        self.attributeValueId = getJSONValue(named: "attributeValueId", from: values["attributeValue"] as! [String : Any], defaultValue: 0)
    }

    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            //"productAttributeValueId": productAttributeValueId,
            //"productAttributeId": productAttributeId,
            //"attributeValueId": attributeValueId,
            "attributeValue": _attributeValue
        ]
    }
}
