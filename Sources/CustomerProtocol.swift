//
//  CustomerProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

protocol CustomerProtocol {
	
	func getAll(date: Int) throws -> [Customer]
	
	func get(id: Int) throws -> Customer?
	
	func add(item: Customer) throws
	
	func update(id: Int, item: Customer) throws
	
	func delete(id: Int) throws
}
