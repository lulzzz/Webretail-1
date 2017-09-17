//
//  Device.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM
import PerfectLogger

class Device: PostgresSqlORM, Codable {
	
	public var deviceId : Int = 0
	public var storeId : Int = 0
	public var deviceName : String = ""
	public var deviceToken : String = ""
	public var deviceCreated : Int = Int.now()
	public var deviceUpdated : Int = Int.now()
	
	public var _store: Store = Store()

    private enum CodingKeys: String, CodingKey {
        case deviceId
        case deviceName
        case deviceToken
        case _store = "store"
        case deviceUpdated = "updatedAt"
    }

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
    
	/// Performs a find on supplied deviceToken
	func get(deviceToken: String, deviceName: String) {
		do {
			try query(whereclause: "deviceToken = $1 AND deviceName = $2", params: [deviceToken, deviceName], cursor: StORMCursor(limit: 1, offset: 0))
		} catch {
            LogFile.error("\(error)")
		}
	}
}
