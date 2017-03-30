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

	func get(productId: Int) throws -> Discount? {
		let item = Discount()
		var params = [String]()
		params.append(String(productId))
		params.append(String(Int.now()))
		let sql = "SELECT a.* " +
				  "FROM discount AS a " +
				  "INNER JOIN discountproduct AS b " +
				  "WHERE b.productid = $1 AND a.startat < $2 AND a.finishat > $2 " +
				  "ORDER BY a.discountId " +
				  "DESC LIMIT 1 OFFSET 0"
		let current = try item.sqlRows(sql, params: params)
		if current.count > 0 {
			item.to(current[0])
			return item
		}
		return nil
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
