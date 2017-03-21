//
//  MyOrderArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//

import StORM
import TurnstileCrypto

class MyOrderArticleRepository : MyOrderArticleProtocol {
	
	init() {
		let myOrderArticle = MyOrderArticle()
		try? myOrderArticle.setup()
	}
	
	func get(myOrderId: Int) throws -> [MyOrderArticle] {
		let items = MyOrderArticle()
		try items.select(
			whereclause: "myOrderId = $1",
			params: [myOrderId],
			orderby: ["myOrderArticleId"]
		)
		
		return items.rows()
	}
	
	func get(id: Int) throws -> MyOrderArticle? {
		let item = MyOrderArticle()
		try item.get(id)
		
		return item
	}
	
	func add(item: MyOrderArticle) throws {
		try item.save {
			id in item.myOrderArticleId = id as! Int
		}
	}
	
	func update(id: Int, item: MyOrderArticle) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.quantity = item.quantity
		current.price = item.price
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = MyOrderArticle()
		item.myOrderArticleId = id
		try item.delete()
	}
}
