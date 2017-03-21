//
//  MyOrderArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class MyOrderArticle: PostgresSqlORM, JSONConvertible {
	
	public var myOrderArticleId : Int = 0
	public var myOrderId : Int = 0
	public var barcode : String = ""
	public var product : [String:Any] = [String:Any]()
	public var quantity : Double = 0
	public var price : Double = 0
	
	open override func table() -> String { return "myorderarticles" }
	
	open override func to(_ this: StORMRow) {
		myOrderArticleId = this.data["myorderarticleid"] as? Int ?? 0
		myOrderId = this.data["myorderid"] as? Int ?? 0
		barcode = this.data["barcode"] as? String ?? ""
		product = this.data["product"] as? [String:Any] ?? [String:Any]()
		quantity = Double(this.data["quantity"] as? Float ?? 0)
		price = Double(this.data["price"] as? Float ?? 0)
	}
	
	func rows() -> [MyOrderArticle] {
		var rows = [MyOrderArticle]()
		for i in 0..<self.results.rows.count {
			let row = MyOrderArticle()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.myOrderArticleId = getJSONValue(named: "myOrderArticleId", from: values, defaultValue: 0)
		self.myOrderId = getJSONValue(named: "myOrderId", from: values, defaultValue: 0)
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
			"myOrderArticleId": myOrderArticleId,
			"myOrderId": myOrderId,
			"barcode": barcode,
			"product": product,
			"quantity": quantity,
			"price": price.roundCurrency(),
			"amount": (quantity * price).roundCurrency()
		]
	}
}
