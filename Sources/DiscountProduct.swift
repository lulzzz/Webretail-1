//
//  DiscountProduct.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//


import StORM
import PostgresStORM
import PerfectLib

class DiscountProduct: PostgresSqlORM, JSONConvertible {
	
	public var discountProductId : Int = 0
	public var discountId : Int = 0
	public var productId : Int = 0
	
	open override func table() -> String { return "discountproducts" }
	open override func tableIndexes() -> [String] { return ["productId"] }
	
	open override func to(_ this: StORMRow) {
		discountProductId = this.data["discountproductid"] as? Int ?? 0
		productId = this.data["productid"] as? Int ?? 0
	}
	
	func rows() -> [DiscountProduct] {
		var rows = [DiscountProduct]()
		for i in 0..<self.results.rows.count {
			let row = DiscountProduct()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.discountProductId = getJSONValue(named: "discountProductId", from: values, defaultValue: 0)
		self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"discountProductId": discountProductId,
			"productId": productId
		]
	}
}
