//
//  MyOrderProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//

import PerfectLib

protocol MyOrderProtocol {
	
	func getAll() throws -> [MyOrder]
	
	func get(id: Int) throws -> MyOrder?
	
	func add(item: MyOrder) throws
	
	func update(id: Int, item: MyOrder) throws
	
	func delete(id: Int) throws

	func commit(order: MyOrder) throws
	
	func rollback(order: MyOrder) throws
}
