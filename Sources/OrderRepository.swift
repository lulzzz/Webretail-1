//
//  OrderRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import Foundation
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
		
		// get store
		let store = Store()
		try store.get(item.storeId)
		item._store = store
		
		// get causal
		let causal = Causal()
		try causal.get(item.causalId)
		item._causal = causal

		// get customer
		let customer = Customer()
		try customer.get(item.customerId)
		item._customer = customer

		return item
	}
	
	func add(item: Order) throws {
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
		if current.orderStatus == "New" && item.orderStatus == "Processing" {
			try commit(order: current)
		}
		if current.orderStatus == "Processing" && item.orderStatus != "Processing" {
			try rollback(order: current)
		}
		current.orderStatus = item.orderStatus
		current.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Order()
		item.orderId = id
		try item.delete()
	}
	
	func getStatus() -> [OrderStatus] {
		var status = [OrderStatus]()
		status.append(OrderStatus(value: "New"))
		status.append(OrderStatus(value: "Processing"))
		status.append(OrderStatus(value: "Suspended"))
		status.append(OrderStatus(value: "Canceled"))
		status.append(OrderStatus(value: "Completed"))
		return status
	}
	
	func commit(order: Order) throws {
		if order.orderStatus != "New" {
			throw StORMError.error("Order already committed")
		}
		
		var stock = Stock()
		let article = OrderArticle()
		try article.find([("orderId", order.orderId)])
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
	
	func rollback(order: Order) throws {
		if order.orderStatus != "Processing" {
			throw StORMError.error("Order not committed")
		}
		
		var stock = Stock()
		let article = OrderArticle()
		try article.find([("orderId", order.orderId)])
		for item in article.rows() {
			
			let articles = item.product["articles"] as! [[String : Any]];
			let articleId = item.getJSONValue(named: "orderId", from: articles[0], defaultValue: 0)
			
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
	
	func generatePdf(id: Int) {
	}
}
