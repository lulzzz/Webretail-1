//
//  Causal.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Causal: PostgresSqlORM, JSONConvertible {
    
    public var causalId			: Int = 0
    public var causalName		: String = ""
    public var quantity         : Character = " "
    public var booked           : Character = " "
    public var created          : Int = Int.now()
    public var updated          : Int = Int.now()
    
    open override func table() -> String { return "causals" }
    
    open override func to(_ this: StORMRow) {
        causalId    = this.data["causalid"] as? Int         ?? 0
        causalName	= this.data["causalname"] as? String    ?? ""
        quantity	= this.data["quantity"] as? Character   ?? " "
        booked      = this.data["booked"] as? Character     ?? " "
        created     = this.data["created"] as? Int          ?? 0
        updated     = this.data["updated"] as? Int          ?? 0
    }
    
    func rows() -> [Causal] {
        var rows = [Causal]()
        for i in 0..<self.results.rows.count {
            let row = Causal()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.causalId =     getJSONValue(named: "causalId",             from: values, defaultValue: 0)
        self.causalName =   getJSONValue(named: "causalName",           from: values, defaultValue: "")
        self.quantity =     Character(getJSONValue(named: "quantity",   from: values, defaultValue: ""))
        self.booked =       Character(getJSONValue(named: "booked",     from: values, defaultValue: ""))
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "causalId": causalId,
            "causalName": causalName,
            "quantity": quantity,
            "booked": booked
        ]
    }
}
