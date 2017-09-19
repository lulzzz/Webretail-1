//
//  DiscountProduct.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import Foundation
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
        if let product = this.data["discountproduct"] as? [String:Any] {
            let jsonData = try! JSONSerialization.data(withJSONObject: product, options: [])
            discountProduct = try! JSONDecoder().decode(Product.self, from: jsonData)
        }
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

    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        discountProductId = try container.decode(Int.self, forKey: .discountProductId)
        discountId = try container.decode(Int.self, forKey: .discountId)
        productId = try container.decode(Int.self, forKey: .productId)
        discountProduct = try container.decode(Product.self, forKey: .discountProduct)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(discountProductId, forKey: .discountProductId)
        try container.encode(discountId, forKey: .discountId)
        try container.encode(discountProduct, forKey: .discountProduct)
    }
}
