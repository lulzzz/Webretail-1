//
//  ProductAttribute.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ProductAttribute: PostgresSqlORM, Codable {
    
    public var productAttributeId	: Int = 0
    public var productId : Int = 0
    public var attributeId : Int = 0
    
    public var _attribute: Attribute = Attribute()
    public var _attributeValues: [ProductAttributeValue] = [ProductAttributeValue]()

    private enum CodingKeys: String, CodingKey {
        case productAttributeId
        case productId
        case attributeId
        case _attribute = "attribute"
        case _attributeValues = "attributeValues"
    }

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
    
    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        productId = try container.decodeIfPresent(Int.self, forKey: .productId) ?? 0
        let attribute = try container.decode(Attribute.self, forKey: ._attribute)
        attributeId = attribute.attributeId
 
        _attributeValues = try container.decodeIfPresent([ProductAttributeValue].self, forKey: ._attributeValues) ?? [ProductAttributeValue]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(productAttributeId, forKey: .productAttributeId)
        try container.encode(_attribute, forKey: ._attribute)
        try container.encode(_attributeValues, forKey: ._attributeValues)
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
