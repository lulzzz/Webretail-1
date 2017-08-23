//
//  ProductAttribute.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class ProductAttribute: PostgresSqlORM, JSONConvertible {
    
    public var productAttributeId	: Int = 0
    public var productId : Int = 0
    public var attributeId : Int = 0
    
    public var _attribute: Attribute = Attribute()
    public var _attributeValues: [ProductAttributeValue] = [ProductAttributeValue]()

    open override func table() -> String { return "productattributes" }
    
    open override func to(_ this: StORMRow) {
        productAttributeId	= this.data["productattributeid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
        attributeId = this.data["attributeid"] as? Int ?? 0
		_attribute.to(this)
    }
    
    func rows() throws -> [ProductAttribute] {
        var rows = [ProductAttribute]()
        for i in 0..<self.results.rows.count {
            let row = ProductAttribute()
            row.to(self.results.rows[i])
			try row.makeAttributeValues();
			
            rows.append(row)
        }
        return rows
    }
    
    func setJSONValues(_ values:[String:Any]) {
        //self.productAttributeId = getJSONValue(named: "productAttributeId", from: values, defaultValue: 0)
        self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.attributeId = getJSONValue(named: "attributeId", from: values["attribute"] as! [String : Any], defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "productAttributeId": productAttributeId,
            //"productId": productId,
            //"attributeId": attributeId,
            "attribute": _attribute,
            "attributeValues": _attributeValues
        ]
    }
	
	func makeAttributeValues() throws {
		var valueJoin = StORMDataSourceJoin()
		valueJoin.table = "attributevalues"
		valueJoin.direction = StORMJoinType.INNER
		valueJoin.onCondition = "productattributevalues.attributeValueId = attributevalues.attributeValueId"
		
		let attributeValue = ProductAttributeValue()
		try attributeValue.query(
			whereclause: "productattributevalues.productAttributeId = $1",
			params: [self.productAttributeId],
			orderby: ["productattributevalues.attributeValueId"],
			joins: [valueJoin]
		)
		self._attributeValues = try attributeValue.rows()
	}
}
