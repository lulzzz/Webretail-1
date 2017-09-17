//
//  DiscountProduct.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import StORM

class DiscountProduct: PostgresSqlORM, Codable {
	
	public var discountProductId : Int = 0
	public var discountId : Int = 0
	public var productId : Int = 0
	public var discountProduct : Product = Product()
	
	open override func table() -> String { return "discountproducts" }
	
    private enum CodingKeys: String, CodingKey {
        case discountProductId
        case discountId
        case productId
        case discountProduct
    }

    open override func to(_ this: StORMRow) {
		discountProductId = this.data["discountproductid"] as? Int ?? 0
		discountId = this.data["discountid"] as? Int ?? 0
		productId = this.data["productid"] as? Int ?? 0
		discountProduct = this.data["discountproduct"] as? Product ?? Product()
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
	
    /*
	func setJSONValues(_ values:[String:Any]) {
		self.discountProductId = getJSONValue(named: "discountProductId", from: values, defaultValue: 0)
		self.discountId = getJSONValue(named: "discountId", from: values, defaultValue: 0)
		self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
		self.discountProduct = getJSONValue(named: "discountProduct", from: values, defaultValue: [String:Any]())
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"discountProductId": discountProductId,
			"discountId": discountId,
			"discountProduct": discountProduct
		]
	}
    */
}
