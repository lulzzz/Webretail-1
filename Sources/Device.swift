//
//  Device.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM
import PerfectLib

class Device: PostgresSqlORM, JSONConvertible {
	
	public var deviceId : Int = 0
	public var storeId : Int = 0
	public var deviceName : String = ""
	public var deviceToken : String = ""
	public var deviceCreated : Int = Int.now()
	public var deviceUpdated : Int = Int.now()
	
	public var _store: Store = Store()

	open override func table() -> String { return "devices" }
	open override func tableIndexes() -> [String] { return ["deviceId", "deviceName"] }
	
	open override func to(_ this: StORMRow) {
		deviceId = this.data["deviceid"] as? Int ?? 0
		storeId = this.data["storeid"] as? Int ?? 0
		deviceName = this.data["devicename"] as? String ?? ""
		deviceToken = this.data["devicetoken"] as? String ?? ""
		deviceCreated = this.data["devicecreated"] as? Int ?? 0
		deviceUpdated = this.data["deviceupdated"] as? Int ?? 0
		_store.to(this)
	}
	
	func rows() -> [Device] {
		var rows = [Device]()
		for i in 0..<self.results.rows.count {
			let row = Device()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.deviceId = getJSONValue(named: "deviceId", from: values, defaultValue: 0)
		self.deviceName = getJSONValue(named: "deviceName", from: values, defaultValue: "")
		self.deviceToken = getJSONValue(named: "deviceToken", from: values, defaultValue: "")
		self._store.setJSONValues(values["store"] as! [String : Any])
		self.storeId = self._store.storeId
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"deviceId": deviceId,
			"deviceName": deviceName,
			"deviceToken": deviceToken,
			"store": _store,
			"updatedAt": deviceUpdated
		]
	}

	/// Performs a find on supplied deviceToken
	func get(deviceToken: String, deviceName: String) {
		do {
			try query(whereclause: "deviceToken = $1 && deviceName = $2", params: [deviceToken, deviceName], cursor: StORMCursor(limit: 1, offset: 0))
		} catch {
			print(error)
		}
	}
}
