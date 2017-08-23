//
//  AttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class AttributeValue: PostgresSqlORM, JSONConvertible {
    
    public var attributeValueId : Int = 0
	public var attributeId : Int = 0
    public var attributeValueCode	: String = ""
    public var attributeValueName : String = ""
    public var attributeValueCreated : Int = Int.now()
    public var attributeValueUpdated : Int = Int.now()
    
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
    
    func setJSONValues(_ values:[String:Any]) {
        self.attributeValueId = getJSONValue(named: "attributeValueId", from: values, defaultValue: 0)
		self.attributeId = getJSONValue(named: "attributeId", from: values, defaultValue: 0)
        self.attributeValueCode = getJSONValue(named: "attributeValueCode", from: values, defaultValue: "")
        self.attributeValueName = getJSONValue(named: "attributeValueName", from: values, defaultValue: "")
    }

    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "attributeValueId": attributeValueId,
            "attributeId": attributeId,
            "attributeValueCode": attributeValueCode,
            "attributeValueName": attributeValueName
        ]
    }
}
