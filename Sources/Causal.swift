//
//  Causal.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM
import PerfectLib

class Causal: PostgresSqlORM, JSONConvertible {
    
    public var causalId : Int = 0
    public var causalName : String = ""
    public var causalQuantity : Int = 0
    public var causalBooked  : Int = 0
	public var causalIsPos : Bool = false
    public var causalCreated : Int = Int.now()
    public var causalUpdated : Int = Int.now()
    
    open override func table() -> String { return "causals" }
    open override func tableIndexes() -> [String] { return ["causalName"] }
    
    open override func to(_ this: StORMRow) {
        causalId  = this.data["causalid"] as? Int ?? 0
        causalName = this.data["causalname"] as? String ?? ""
        causalQuantity = this.data["causalquantity"] as? Int ?? 0
        causalBooked = this.data["causalbooked"] as? Int ?? 0
		causalIsPos = this.data["causalispos"] as? Bool ?? true
        causalCreated = this.data["causalcreated"] as? Int ?? 0
        causalUpdated = this.data["causalupdated"] as? Int ?? 0
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
    
    func setJSONValues(_ values:[String:Any]) {
        self.causalId = getJSONValue(named: "causalId", from: values, defaultValue: 0)
        self.causalName = getJSONValue(named: "causalName", from: values, defaultValue: "")
        self.causalQuantity = getJSONValue(named: "causalQuantity", from: values, defaultValue: 0)
        self.causalBooked = getJSONValue(named: "causalBooked",  from: values, defaultValue: 0)
		self.causalIsPos = getJSONValue(named: "causalIsPos", from: values, defaultValue: false)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "causalId": causalId,
            "causalName": causalName,
            "causalQuantity": causalQuantity,
            "causalBooked": causalBooked,
            "causalIsPos": causalIsPos,
            "updatedAt": causalUpdated
        ]
    }
}
