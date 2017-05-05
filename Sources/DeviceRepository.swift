//
//  DeviceRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM

struct DeviceRepository : DeviceProtocol {
	
	internal func getJoin() -> StORMDataSourceJoin {
		return StORMDataSourceJoin(
			table: "stores",
			onCondition: "devices.storeId = stores.storeId",
			direction: StORMJoinType.INNER
		)
	}

	func getAll(date: Int) throws -> [Device] {
		let items = Device()
		try items.query(
			whereclause: "deviceUpdated > $1", params: [date],
			orderby: ["devices.deviceId"],
			joins: [self.getJoin()]
		)
		
		return items.rows()
	}
	
	func get(id: Int) throws -> Device? {
		let item = Device()
		try item.query(
			whereclause: "devices.deviceId = $1",
			params: [id],
			joins: [self.getJoin()]
		)
		
		return item
	}
	
	func add(item: Device) throws {
		item.deviceCreated = Int.now()
		item.deviceUpdated = Int.now()
		try item.save {
			id in item.deviceId = id as! Int
		}
	}
	
	func update(id: Int, item: Device) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.deviceName = item.deviceName
		current.deviceToken = item.deviceToken
		current.deviceUpdated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Device()
		item.deviceId = id
		try item.delete()
	}
}
