//
//  OrderRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import StORM
import TurnstileCrypto

class OrderRepository : OrderProtocol {
	
	init() {
		let order = Order()
		try? order.setup()
	}
	
	func getAll() throws -> [Order] {
		let items = Order()
		try items.findAll()
		
		return try items.rows()
	}
	
	func get(id: Int) throws -> Order? {
		let item = Order()
		try item.get(id)
		
		return item
	}
	
	func add(item: Order) throws {
		item.created = Int.now()
		item.updated = Int.now()
		try item.save {
			id in item.orderId = id as! Int
		}
	}
	
	func update(id: Int, item: Order) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.causalId = item.causalId
		current.storeId = item.storeId
		current.customerId = item.customerId
		current.orderNumber = item.orderNumber
		current.orderDate = item.orderDate
		current.orderNote = item.orderNote
		current.orderStatus = item.orderStatus
		current.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Order()
		item.orderId = id
		try item.delete()
	}
}
