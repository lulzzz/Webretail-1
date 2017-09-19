//
//  ProductAttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ProductAttributeValue: PostgresSqlORM, Codable {
    
    public var productAttributeValueId	: Int = 0
    public var productAttributeId : Int = 0
    public var attributeValueId : Int = 0
    
    public var _attributeValue: AttributeValue = AttributeValue()

    private enum CodingKeys: String, CodingKey {
        case productAttributeId
        case _attributeValue = "attributeValue"
    }

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
    
    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        productAttributeId = try container.decodeIfPresent(Int.self, forKey: .productAttributeId) ?? 0
        _attributeValue = try container.decode(AttributeValue.self, forKey: ._attributeValue)
        attributeValueId = _attributeValue.attributeValueId
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(_attributeValue, forKey: ._attributeValue)
    }
}
