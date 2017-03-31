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
		try items.findAll()
		
		return items.rows()
	}
	
	func getProducts(id: Int) throws -> [DiscountProduct] {
		let items = DiscountProduct()
		try items.find([("discountId", id)])
		
		return items.rows()
	}

	func get(id: Int) throws -> Discount? {
		let item = Discount()
		try item.get(id)
		
		return item
	}
	
	func add(item: Discount) throws {
		item.updated = Int.now()
		try item.save {
			id in item.discountId = id as! Int
		}
	}
	
	func update(id: Int, item: Discount) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.discountName = item.discountName
		current.percentage = item.percentage
		current.price = item.price
		current.startAt = item.startAt
		current.finishAt = item.finishAt
		item.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Discount()
		item.discountId = id
		try item.delete()
	}

	func addProduct(item: DiscountProduct) throws {
		let product = Product()
		let productCode = item.getJSONValue(named: "productCode", from: item.product, defaultValue: "")
		try product.select(whereclause: "productCode = $1 OR productId = $2",
		                   params: [productCode, item.productId],
		                   orderby: [],
		                   cursor: StORMCursor(limit: 1, offset: 0))
		if product.results.rows.count == 0 {
			throw StORMError.noRecordFound
		}
		product.to(product.results.rows[0])
		
		item.productId = product.productId
		item.product = try product.getJSONValues()
		
		try item.find([("discountId", item.discountId),("productId", item.productId)])
		if item.discountProductId > 0 {
			throw StORMError.error("Cannot insert duplicate key")
		}
		try item.save {
			id in item.discountProductId = id as! Int
		}
	}
	
	func removeProduct(id: Int) throws {
		let item = DiscountProduct()
		item.discountProductId = id
		try item.delete()
	}
}
