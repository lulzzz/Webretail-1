//
//  CashRegisterRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM

struct CashRegisterRepository : CashRegisterProtocol {
	
	func getAll() throws -> [CashRegister] {
		let items = CashRegister()
		try items.query()
		
		return items.rows()
	}
	
	func get(id: Int) throws -> CashRegister? {
		let item = CashRegister()
		try item.query(id: id)
		
		return item
	}
	
	func add(item: CashRegister) throws {
		item.cashRegisterCreated = Int.now()
		item.cashRegisterUpdated = Int.now()
		try item.save {
			id in item.cashRegisterId = id as! Int
		}
	}
	
	func update(id: Int, item: CashRegister) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.storeId = item.storeId
		current.cashRegisterName = item.cashRegisterName
		current.cashRegisterUpdated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = CashRegister()
		item.cashRegisterId = id
		try item.delete()
	}
}
