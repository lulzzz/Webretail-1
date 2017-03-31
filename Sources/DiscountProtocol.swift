//
//  DiscountProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

protocol DiscountProtocol {
	
	func getAll() throws -> [Discount]
	
	func get(id: Int) throws -> Discount?
	
	func getProducts(id: Int) throws -> [DiscountProduct]

	func add(item: Discount) throws
	
	func update(id: Int, item: Discount) throws
	
	func delete(id: Int) throws

	func addProduct(item: DiscountProduct) throws

	func removeProduct(id: Int) throws
}
