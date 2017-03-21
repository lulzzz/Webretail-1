//
//  OrderArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class OrderArticle: PostgresSqlORM, JSONConvertible {
	
	public var orderArticleId : Int = 0
	public var orderId : Int = 0
	public var barcode : String = ""
	public var product : [String:Any] = [String:Any]()
	public var quantity : Double = 0
	public var price : Double = 0
	
	open override func table() -> String { return "orderarticles" }
	
	open override func to(_ this: StORMRow) {
		orderArticleId = this.data["orderarticleid"] as? Int ?? 0
		orderId = this.data["orderid"] as? Int ?? 0
		barcode = this.data["barcode"] as? String ?? ""
		product = this.data["product"] as? [String:Any] ?? [String:Any]()
		quantity = Double(this.data["quantity"] as? Float ?? 0)
		price = Double(this.data["price"] as? Float ?? 0)
	}
	
	func rows() -> [OrderArticle] {
		var rows = [OrderArticle]()
		for i in 0..<self.results.rows.count {
			let row = OrderArticle()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.orderArticleId = getJSONValue(named: "orderArticleId", from: values, defaultValue: 0)
		self.orderId = getJSONValue(named: "orderId", from: values, defaultValue: 0)
		self.barcode = getJSONValue(named: "barcode", from: values, defaultValue: "")
		self.product = getJSONValue(named: "product", from: values, defaultValue: [String:Any]())
		self.quantity = getJSONValue(named: "quantity", from: values, defaultValue: 1.0)
		self.price = getJSONValue(named: "price", from: values, defaultValue: 0.0)
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"orderArticleId": orderArticleId,
			"orderId": orderId,
			"barcode": barcode,
			"product": product,
			"quantity": quantity,
			"price": price.roundCurrency(),
			"amount": (quantity * price).roundCurrency()
		]
	}
}
