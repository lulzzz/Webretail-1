//
//  CashRegisterRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM

struct CashRegisterRepository : CashRegisterProtocol {
	
	internal func getJoins() -> [StORMDataSourceJoin] {
		var join = StORMDataSourceJoin()
		join.table = "stores"
		join.direction = StORMJoinType.INNER
		join.onCondition = "cashregisters.storeId = stores.storeId"
		return [join]
	}

	func getAll() throws -> [CashRegister] {
		let items = CashRegister()
		try items.query(
			orderby: ["cashregisters.cashRegisterId"],
			joins: self.getJoins()
		)
		
		return items.rows()
	}
	
	func get(id: Int) throws -> CashRegister? {
		let item = CashRegister()
		try item.query(
			whereclause: "cashregisters.cashRegisterId = $1",
			params: [String(id)],
			joins: self.getJoins()
		)
		
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
