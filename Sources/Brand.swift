//
//  Brand.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Brand: PostgresSqlORM, JSONConvertible {
    
    public var brandId : Int = 0
    public var brandName	 : String = ""
    public var created : Int = Int.now()
    public var updated : Int = Int.now()
    
    open override func table() -> String { return "brands" }
    
    open override func to(_ this: StORMRow) {
        brandId = this.data["brandid"] as? Int ?? 0
        brandName = this.data["brandname"] as? String ?? ""
        created = this.data["created"] as? Int ?? 0
        updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() -> [Brand] {
        var rows = [Brand]()
        for i in 0..<self.results.rows.count {
            let row = Brand()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.brandId = getJSONValue(named: "brandId", from: values, defaultValue: 0)
        self.brandName = getJSONValue(named: "brandName", from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }

    func getJSONValues() -> [String : Any] {
        return [
            "brandId": brandId,
            "brandName": brandName
        ]
    }
}
