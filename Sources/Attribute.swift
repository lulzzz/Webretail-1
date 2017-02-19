//
//  Attribute.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Attribute: PostgresStORM, JSONConvertible {
    
    public var attributeId		: Int = 0
    public var attributeName	: String = ""
    public var created          : Int = Helper.now()
    public var updated          : Int = Helper.now()
    
    open override func table() -> String { return "attributes" }
    
    open override func to(_ this: StORMRow) {
        attributeId		= this.data["attributeid"] as? Int      ?? 0
        attributeName	= this.data["attributename"] as? String ?? ""
        created         = this.data["created"] as? Int          ?? 0
        updated         = this.data["updated"] as? Int          ?? 0
    }
    
    func rows() -> [Attribute] {
        var rows = [Attribute]()
        for i in 0..<self.results.rows.count {
            let row = Attribute()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.attributeId = Helper.getJSONValue(named: "attributeId", from: values, defaultValue: 0)
        self.attributeName = Helper.getJSONValue(named: "attributeName", from: values, defaultValue: "")
    }

    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "attributeId": attributeId,
            "attributeName": attributeName
            //,"created": Helper.formatDate(unixdate: created)
            //,"updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
