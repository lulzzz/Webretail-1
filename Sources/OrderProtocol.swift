//
//  OrderProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

protocol OrderProtocol {
	
	func getAll() throws -> [Order]
	
	func get(id: Int) throws -> Order?
	
	func add(item: Order) throws
	
	func update(id: Int, item: Order) throws
	
	func delete(id: Int) throws
	
	func getStatus() -> [OrderStatus]
	
	func commit(id: Int) throws
	
	func rollback(id: Int) throws

	func generatePdf(id: Int)
}
