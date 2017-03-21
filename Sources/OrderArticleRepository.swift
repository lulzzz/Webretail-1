//
//  OrderArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import StORM
import TurnstileCrypto

class OrderArticleRepository : OrderArticleProtocol {
	
	init() {
		let orderArticle = OrderArticle()
		try? orderArticle.setup()
	}
	
	func get(orderId: Int) throws -> [OrderArticle] {
		let items = OrderArticle()
		try items.select(
			whereclause: "orderId = $1",
			params: [orderId],
			orderby: ["orderArticleId"]
		)
		
		return items.rows()
	}
	
	func get(id: Int) throws -> OrderArticle? {
		let item = OrderArticle()
		try item.get(id)
		
		return item
	}
	
	func add(item: OrderArticle) throws {
		try item.save {
			id in item.orderArticleId = id as! Int
		}
	}
	
	func update(id: Int, item: OrderArticle) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.quantity = item.quantity
		current.price = item.price
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = OrderArticle()
		item.orderArticleId = id
		try item.delete()
	}
}
