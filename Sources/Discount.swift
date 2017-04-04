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
	public var discountPercentage : Int = 0
	public var discountPrice : Double = 0
	public var discountStartAt : Int = Int.now()
	public var discountFinishAt : Int = Int.now()
	public var discountUpdated : Int = Int.now()
	
	open override func table() -> String { return "discounts" }
	open override func tableIndexes() -> [String] { return ["discountName"] }
	
	open override func to(_ this: StORMRow) {
		discountId = this.data["discountid"] as? Int ?? 0
		discountName = this.data["discountname"] as? String ?? ""
		discountPercentage = this.data["discountpercentage"] as? Int ?? 0
		discountPrice = Double(this.data["discountprice"] as? Float ?? 0)
		discountStartAt = this.data["discountstartat"] as? Int ?? 0
		discountFinishAt = this.data["discountfinishat"] as? Int ?? 0
		discountUpdated = this.data["discountupdated"] as? Int ?? 0
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
		self.discountPercentage = getJSONValue(named: "discountPercentage", from: values, defaultValue: 0)
		self.discountPrice = getJSONValue(named: "discountPrice", from: values, defaultValue: 0.0)
		self.discountStartAt = getJSONValue(named: "discountStartAt", from: values, defaultValue: "").DateToInt()
		self.discountFinishAt = getJSONValue(named: "discountFinishAt", from: values, defaultValue: "").DateToInt()
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"discountId": discountId,
			"discountName": discountName,
			"discountPercentage": discountPercentage,
			"discountPrice": discountPrice.roundCurrency(),
			"discountStartAt": discountStartAt.formatDateShort(),
			"discountFinishAt": discountFinishAt.formatDateShort(),
			"discountUpdated": discountUpdated.formatDate()
		]
	}
	
	func get(productId: Int) throws {
		var join = StORMDataSourceJoin()
		join.table = "discountproducts"
		join.direction = StORMJoinType.INNER
		join.onCondition = "discounts.discountId = discountproducts.discountId"
		
		try self.query(
			columns: [],
			whereclause: "discountproducts.productId = $1 AND discounts.discountStartAt < $2 AND discounts.discountFinishAt > $2",
			params: [String(productId), String(Int.now())],
			orderby: ["discounts.discountId DESC"],
			cursor: StORMCursor(limit: 1, offset: 0),
			joins: [ join ]
		)

//		var params = [String]()
//		params.append(String(productId))
//		params.append(String(Int.now()))
//		let sql = "SELECT a.* " +
//			"FROM discounts AS a " +
//			"INNER JOIN discountproducts AS b ON a.discountId = b.discountId " +
//			"WHERE b.productId = $1 AND a.startat < $2 AND a.finishat > $2 " +
//			"ORDER BY a.discountId DESC " +
//			"LIMIT 1 OFFSET 0"
//		let current = try self.sqlRows(sql, params: params)
//		if current.count > 0 {
//			self.to(current[0])
//		}
	}
	
	func makeDiscount(sellingPrice: Double) {
		if self.discountPercentage > 0 {
			self.discountPrice = sellingPrice - (sellingPrice * Double(self.discountPercentage) / 100)
		} else {
			self.discountPercentage = Int((sellingPrice - self.discountPrice) / sellingPrice * 100.0)
		}
	}
}
