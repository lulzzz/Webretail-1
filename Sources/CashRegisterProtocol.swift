//
//  CashRegisterProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

protocol CashRegisterProtocol {
	
	func getAll(date: Int) throws -> [CashRegister]
	
	func get(id: Int) throws -> CashRegister?
	
	func add(item: CashRegister) throws
	
	func update(id: Int, item: CashRegister) throws
	
	func delete(id: Int) throws
}
