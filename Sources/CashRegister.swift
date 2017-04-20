//
//  CashRegister.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM
import PerfectLib

class CashRegister: PostgresSqlORM, JSONConvertible {
	
	public var cashRegisterId : Int = 0
	public var storeId : Int = 0
	public var cashRegisterName : String = ""
	public var cashRegisterCreated : Int = Int.now()
	public var cashRegisterUpdated : Int = Int.now()
	
	public var _store: Store = Store()

	open override func table() -> String { return "cashregisters" }
	open override func tableIndexes() -> [String] { return ["cashRegisterName"] }
	
	open override func to(_ this: StORMRow) {
		cashRegisterId = this.data["cashregisterid"] as? Int ?? 0
		storeId = this.data["storeid"] as? Int ?? 0
		cashRegisterName = this.data["cashregistername"] as? String ?? ""
		cashRegisterCreated = this.data["cashregistercreated"] as? Int ?? 0
		cashRegisterUpdated = this.data["cashregisterupdated"] as? Int ?? 0
		_store.to(this)
	}
	
	func rows() -> [CashRegister] {
		var rows = [CashRegister]()
		for i in 0..<self.results.rows.count {
			let row = CashRegister()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.cashRegisterId = getJSONValue(named: "cashRegisterId", from: values, defaultValue: 0)
		self.cashRegisterName = getJSONValue(named: "cashRegisterName", from: values, defaultValue: "")
		self._store.setJSONValues(values["store"] as! [String : Any])
		self.storeId = self._store.storeId
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"cashRegisterId": cashRegisterId,
			"cashRegisterName": cashRegisterName,
			"store": _store,
			"updatedAt": cashRegisterUpdated
		]
	}
}
