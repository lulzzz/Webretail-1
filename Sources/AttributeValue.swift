//
//  AttributeValue.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib


class AttributeValue: PostgresSqlORM, JSONConvertible {
    
    public var attributeValueId		: Int = 0
    public var attributeValueCode	: String = ""
    public var attributeValueName	: String = ""
    public var attributeId          : Int = 0
    public var created              : Int = Int.now()
    public var updated              : Int = Int.now()
    
    open override func table() -> String { return "attributevalues" }
    
    open override func to(_ this: StORMRow) {
        attributeValueId	= this.data["attributevalueid"] as? Int         ?? 0
        attributeValueCode	= this.data["attributevaluecode"] as? String    ?? ""
        attributeValueName	= this.data["attributevaluename"] as? String    ?? ""
        attributeId         = this.data["attributeid"] as? Int              ?? 0
        created             = this.data["created"] as? Int                  ?? 0
        updated             = this.data["updated"] as? Int                  ?? 0
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
    
    public func setJSONValues(_ values:[String:Any]) {
        self.attributeValueId = getJSONValue(named: "attributeValueId", from: values, defaultValue: 0)
        self.attributeValueCode = getJSONValue(named: "attributeValueCode", from: values, defaultValue: "")
        self.attributeValueName = getJSONValue(named: "attributeValueName", from: values, defaultValue: "")
        self.attributeId = getJSONValue(named: "attributeId", from: values, defaultValue: 0)
    }

    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "attributeValueId": attributeValueId,
            "attributeValueCode": attributeValueCode,
            "attributeValueName": attributeValueName,
            "attributeId": attributeId
            //,"created": Helper.formatDate(unixdate: created)
            //,"updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
