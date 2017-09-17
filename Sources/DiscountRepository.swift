//
//  DiscountRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import StORM

struct DiscountRepository : DiscountProtocol {
	
	func getAll() throws -> [Discount] {
		let items = Discount()
		try items.query()
		
		return items.rows()
	}
	
	func getProducts(id: Int) throws -> [DiscountProduct] {
		let items = DiscountProduct()
		try items.query(whereclause: "discountId = $1",
		                params: [id],
		                cursor: StORMCursor(limit: 10000, offset: 0))
		
		return items.rows()
	}

	func get(id: Int) throws -> Discount? {
		let item = Discount()
		try item.query(id: id)
		
		return item
	}
	
	func add(item: Discount) throws {
		item.discountUpdated = Int.now()
		try item.save {
			id in item.discountId = id as! Int
		}
	}
	
	func update(id: Int, item: Discount) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		item.discountUpdated = Int.now()
		current.discountName = item.discountName
		current.discountPercentage = item.discountPercentage
		current.discountPrice = item.discountPrice
		current.discountStartAt = item.discountStartAt
		current.discountFinishAt = item.discountFinishAt
		current.discountUpdated = item.discountUpdated
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Discount()
		item.discountId = id
		try item.delete()
	}

	func addProduct(item: DiscountProduct) throws {
		let product = Product()
		let productCode = item.discountProduct.productCode
		try product.query(whereclause: "productCode = $1 OR productId = $2",
						  params: [productCode, item.productId],
						  cursor: StORMCursor(limit: 1, offset: 0))
		if product.results.rows.count == 0 {
			throw StORMError.noRecordFound
		}
		product.to(product.results.rows[0])
		
		item.productId = product.productId
		item.discountProduct = product
		
		try item.query(whereclause: "productId = $1 AND discountId = $2",
		               params: [item.productId, item.discountId],
		               cursor: StORMCursor(limit: 1, offset: 0))

		if item.discountProductId > 0 {
			throw StORMError.error("Cannot insert duplicate key")
		}
		try item.save {
			id in item.discountProductId = id as! Int
            
            product.productUpdated = Int.now()
            try! product.save()
		}
	}
	
	func removeProduct(id: Int) throws {
		let item = DiscountProduct()
		item.discountProductId = id
		try item.delete()
        
        let product = Product()
        try product.query(id: item.productId)
        product.productUpdated = Int.now()
        try product.save()
    }
}
