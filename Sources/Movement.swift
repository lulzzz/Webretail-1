//
//  Movement.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 28/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Movement: PostgresSqlORM, JSONConvertible {
    
    public var movementId : Int = 0
    public var storeId : Int = 0
    public var causalId : Int = 0
    public var movementDesc : String = ""
    public var movementNote : String = ""
    public var movementUser : String = ""
    public var created : Int = Int.now()
    public var updated : Int = Int.now()
    
    open override func table() -> String { return "movements" }
    
    open override func to(_ this: StORMRow) {
        movementId = this.data["movementid"] as? Int ?? 0
        storeId = this.data["storeid"] as? Int ?? 0
        causalId = this.data["causalid"] as? Int ?? 0
        movementDesc = this.data["movementdesc"] as? String  ?? ""
        movementNote = this.data["movementnote"] as? String  ?? ""
        movementUser = this.data["movementuser"] as? String  ?? ""
        created = this.data["created"] as? Int ?? 0
        updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() -> [Movement] {
        var rows = [Movement]()
        for i in 0..<self.results.rows.count {
            let row = Movement()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.movementId =  getJSONValue(named: "movementId", from: values, defaultValue: 0)
        self.storeId = getJSONValue(named: "storeId", from: values, defaultValue: 0)
        self.causalId = getJSONValue(named: "causalId", from: values, defaultValue: 0)
        self.movementDesc = getJSONValue(named: "movementDesc", from: values, defaultValue: "")
        self.movementNote = getJSONValue(named: "movementNote", from: values, defaultValue: "")
        self.movementUser = getJSONValue(named: "movementUser", from: values, defaultValue: "")
        self.created = getJSONValue(named: "created", from: values, defaultValue: 0)
        self.updated = getJSONValue(named: "updated", from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementId": movementId,
            "storeId": storeId,
            "causalId": causalId,
            "movementDesc": movementDesc,
            "movementNote": movementNote,
            "movementUser": movementUser,
            "created": created.formatDate(),
            "updated": updated.formatDate()
        ]
    }
}
