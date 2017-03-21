//
//  MyOrderRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//


import Foundation
import StORM
import TurnstileCrypto

class MyOrderRepository : MyOrderProtocol {
	
	init() {
		let myOrder = MyOrder()
		try? myOrder.setup()
	}
	
	func getAll() throws -> [MyOrder] {
		let items = MyOrder()
		try items.findAll()
		
		return try items.rows()
	}
	
	func get(id: Int) throws -> MyOrder? {
		let item = MyOrder()
		try item.get(id)
		
		// get store
		let store = Store()
		try store.get(item.storeId)
		item._store = store
		
		// get causal
		let causal = Causal()
		try causal.get(item.causalId)
		item._causal = causal

		return item
	}
	
	func add(item: MyOrder) throws {
		item.updated = Int.now()
		try item.save {
			id in item.myOrderId = id as! Int
		}
	}
	
	func update(id: Int, item: MyOrder) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.causalId = item.causalId
		current.storeId = item.storeId
		current.myOrderNumber = item.myOrderNumber
		current.myOrderDate = item.myOrderDate
		current.myOrderSupplier = item.myOrderSupplier
		current.myOrderNote = item.myOrderNote
		if current.myOrderStatus == "New" && item.myOrderStatus == "Processing" {
			try commit(order: current)
		}
		if current.myOrderStatus == "Processing" && item.myOrderStatus != "Processing" {
			try rollback(order: current)
		}
		current.myOrderStatus = item.myOrderStatus
		current.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = MyOrder()
		item.myOrderId = id
		try item.delete()
	}

	func commit(order: MyOrder) throws {
		if order.myOrderStatus != "New" {
			throw StORMError.error("Order already committed")
		}
		
		var stock = Stock()
		let article = MyOrderArticle()
		try article.find([("myOrderId", order.myOrderId)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "articleId", from: articles[0], defaultValue: 0)
			
			let cursor = StORMCursor(limit: 1, offset: 0)
			try stock.select(
				whereclause: "articleId = $1 AND storeId = $2",
				params: [ articleId, order.storeId ],
				orderby: [],
				cursor: cursor)
			
			if (stock.rows().count == 0) {
				stock.storeId = order.storeId
				stock.articleId = articleId
				try stock.save()
			} else {
				stock = stock.rows().first!
			}
			
			if order._causal.quantity > 0 {
				stock.quantity += item.quantity
			} else if order._causal.quantity < 0 {
				stock.quantity -= item.quantity
			}
			
			if order._causal.booked > 0 {
				stock.booked += item.quantity
			} else if order._causal.booked < 0 {
				stock.booked -= item.quantity
			}
			try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
		}
	}
	
	func rollback(order: MyOrder) throws {
		if order.myOrderStatus != "Processing" {
			throw StORMError.error("Order not committed")
		}
		
		var stock = Stock()
		let article = MyOrderArticle()
		try article.find([("myOrderId", order.myOrderId)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "myOrderId", from: articles[0], defaultValue: 0)
			
			let cursor = StORMCursor(limit: 1, offset: 0)
			try stock.select(
				whereclause: "articleId = $1 AND stockId = $2",
				params: [ articleId, order.storeId ],
				orderby: [],
				cursor: cursor)
			
			if (stock.rows().count == 0) {
				stock.storeId = order.storeId
				stock.articleId = articleId
				try stock.save()
			} else {
				stock = stock.rows().first!
			}
			
			if order._causal.quantity > 0 {
				stock.quantity -= item.quantity
			} else if order._causal.quantity < 0 {
				stock.quantity += item.quantity
			}
			
			if order._causal.booked > 0 {
				stock.booked -= item.quantity
			} else if order._causal.booked < 0 {
				stock.booked += item.quantity
			}
			try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
		}
	}
}
