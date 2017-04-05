//
//  InvoiceProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 05/04/17.
//
//

protocol InvoiceProtocol {
	
	func getAll() throws -> [Invoice]
	
	func get(id: Int) throws -> Invoice?
	
	func add(item: Invoice) throws
	
	func update(id: Int, item: Invoice) throws
	
	func delete(id: Int) throws
	
	func addMovement(id: Int, invoiceId: Int) throws
	
	func removeMovement(id: Int) throws
}
