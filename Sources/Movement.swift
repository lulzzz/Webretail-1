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

struct MovementStatus: JSONConvertible {
	public var value: String
	
	func getJSONValues() -> [String : Any] {
		return ["value": value]
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
}

class Movement: PostgresSqlORM, JSONConvertible {
    
    public var movementId : Int = 0
	public var movementNumber : Int = 0
	public var movementDate : Int = Int.now()
	public var movementDesc : String = ""
    public var movementNote : String = ""
	public var movementStatus : String = ""
	public var store : [String:Any] = [String:Any]()
	public var causal : [String:Any] = [String:Any]()
	public var customer : [String:Any] = [String:Any]()
	public var receipt : [String:Any] = [String:Any]()
	public var updated : Int = Int.now()
	
    open override func table() -> String { return "movements" }
    
    open override func to(_ this: StORMRow) {
        movementId = this.data["movementid"] as? Int ?? 0
		movementNumber = this.data["movementnumber"] as? Int ?? 0
		movementDate = this.data["movementdate"] as? Int ?? 0
		movementDesc = this.data["movementdesc"] as? String  ?? ""
        movementNote = this.data["movementnote"] as? String  ?? ""
		movementStatus = this.data["movementstatus"] as? String ?? ""
		store = this.data["store"] as? [String:Any] ?? [String:Any]()
		causal = this.data["causal"] as? [String:Any] ?? [String:Any]()
		customer = this.data["customer"] as? [String:Any] ?? [String:Any]()
		receipt = this.data["receipt"] as? [String:Any] ?? [String:Any]()
		updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() throws -> [Movement] {
        var rows = [Movement]()
        for i in 0..<self.results.rows.count {
            let row = Movement()
            row.to(self.results.rows[i])
			rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.movementId = getJSONValue(named: "movementId", from: values, defaultValue: 0)
		self.movementNumber = getJSONValue(named: "movementNumber", from: values, defaultValue: 0)
		self.movementDate = getJSONValue(named: "movementDate", from: values, defaultValue: "").DateToInt()
        self.movementDesc = getJSONValue(named: "movementDesc", from: values, defaultValue: "")
        self.movementNote = getJSONValue(named: "movementNote", from: values, defaultValue: "")
		self.movementStatus = getJSONValue(named: "movementStatus", from: values, defaultValue: "")
		self.store = getJSONValue(named: "store", from: values, defaultValue: [String:Any]())
		self.causal = getJSONValue(named: "causal", from: values, defaultValue: [String:Any]())
		self.customer = getJSONValue(named: "customer", from: values, defaultValue: [String:Any]())
		self.receipt = getJSONValue(named: "receipt", from: values, defaultValue: [String:Any]())
	}
	
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementId": movementId,
            "movementNumber": movementNumber,
            "movementDate": movementDate.formatDate(),
            "movementDesc": movementDesc,
            "movementNote": movementNote,
            "movementStatus": movementStatus,
            "store": store,
            "causal": causal,
            "customer": customer,
            "receipt": receipt,
            "updated": updated.formatDate()
        ]
    }

	func newNumber() throws {
		let getCount = try self.sqlRows("SELECT MAX(movementnumber) AS counter FROM \(table())", params: [])
		self.movementNumber = 1
		self.movementNumber += getCount.first?.data["counter"] as? Int ?? 1000
	}
}
