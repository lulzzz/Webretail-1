//
//  AttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class AttributeValue: PostgresSqlORM, Codable {
    
    public var attributeValueId : Int = 0
	public var attributeId : Int = 0
    public var attributeValueCode	: String = ""
    public var attributeValueName : String = ""
    public var attributeValueCreated : Int = Int.now()
    public var attributeValueUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case attributeValueId
        case attributeId
        case attributeValueCode
        case attributeValueName
    }

    open override func table() -> String { return "attributevalues" }
    open override func tableIndexes() -> [String] { return ["attributeValueCode", "attributeValueName"] }

    open override func to(_ this: StORMRow) {
        attributeValueId	= this.data["attributevalueid"] as? Int ?? 0
		attributeId = this.data["attributeid"] as? Int ?? 0
        attributeValueCode = this.data["attributevaluecode"] as? String ?? ""
        attributeValueName = this.data["attributevaluename"] as? String ?? ""
        attributeValueCreated = this.data["attributevaluecreated"] as? Int ?? 0
        attributeValueUpdated = this.data["attributevalueupdated"] as? Int ?? 0
    }
    
    func rows() -> [AttributeValue] {
        var rows = [AttributeValue]()
        for i in 0..<self.results.rows.count {
            let row = AttributeValue()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
}
