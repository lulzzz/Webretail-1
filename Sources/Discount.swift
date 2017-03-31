//
//  Discount.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//


import StORM
import PostgresStORM
import PerfectLib

class Discount: PostgresSqlORM, JSONConvertible {
	
	public var discountId : Int = 0
	public var discountName : String = ""
	public var percentage : Int = 0
	public var price : Double = 0
	public var startAt : Int = Int.now()
	public var finishAt : Int = Int.now()
	public var updated : Int = Int.now()
	
	open override func table() -> String { return "discounts" }
	open override func tableIndexes() -> [String] { return ["discountName"] }
	
	open override func to(_ this: StORMRow) {
		discountId = this.data["discountid"] as? Int ?? 0
		discountName = this.data["discountname"] as? String ?? ""
		percentage = this.data["percentage"] as? Int ?? 0
		price = Double(this.data["price"] as? Float ?? 0)
		startAt = this.data["startat"] as? Int ?? 0
		finishAt = this.data["finishat"] as? Int ?? 0
		updated = this.data["updated"] as? Int ?? 0
	}
	
	func rows() -> [Discount] {
		var rows = [Discount]()
		for i in 0..<self.results.rows.count {
			let row = Discount()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.discountId = getJSONValue(named: "discountId", from: values, defaultValue: 0)
		self.discountName = getJSONValue(named: "discountName", from: values, defaultValue: "")
		self.percentage = getJSONValue(named: "percentage", from: values, defaultValue: 0)
		self.price = getJSONValue(named: "price", from: values, defaultValue: 0.0)
		self.startAt = getJSONValue(named: "startAt", from: values, defaultValue: "").DateToInt()
		self.finishAt = getJSONValue(named: "finishAt", from: values, defaultValue: "").DateToInt()
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"discountId": discountId,
			"discountName": discountName,
			"percentage": percentage,
			"price": price.roundCurrency(),
			"startAt": startAt.formatDate(),
			"finishAt": finishAt.formatDate(),
			"updated": updated.formatDate()
		]
	}
	
	func get(productId: Int) throws {
		var params = [String]()
		params.append(String(productId))
		params.append(String(Int.now()))
		let sql = "SELECT a.* " +
			"FROM discounts AS a " +
			"INNER JOIN discountproducts AS b ON a.discountId = b.discountId " +
			"WHERE b.productId = $1 AND a.startat < $2 AND a.finishat > $2 " +
			"ORDER BY a.discountId " +
		"DESC LIMIT 1 OFFSET 0"
		let current = try self.sqlRows(sql, params: params)
		if current.count > 0 {
			self.to(current[0])
		}
	}
	
	func makeDiscount(sellingPrice: Double) {
		if self.percentage > 0 {
			self.price = sellingPrice * Double(self.percentage) / 100
		} else {
			self.percentage = Int((sellingPrice - self.price) / sellingPrice * 100.0)
		}
	}
}
