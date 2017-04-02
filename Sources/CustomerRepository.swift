//
//  CustomerRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import StORM
import TurnstileCrypto

struct CustomerRepository : CustomerProtocol {

	func getAll() throws -> [Customer] {
		let items = Customer()
		try items.query()
		
		return items.rows()
	}
	
	func get(id: Int) throws -> Customer? {
		let item = Customer()
		try item.query(id: id)
		
		return item
	}
	
	func add(item: Customer) throws {
		item.created = Int.now()
		item.updated = Int.now()
		try item.save {
			id in item.customerId = id as! Int
		}
	}
	
	func update(id: Int, item: Customer) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.customerName = item.customerName
		current.customerEmail = item.customerEmail
		current.customerPhone = item.customerPhone
		current.customerAddress = item.customerAddress
		current.customerCity = item.customerCity
		current.customerZip = item.customerZip
		current.customerCountry = item.customerCountry
		current.customerFiscalCode = item.customerFiscalCode
		current.customerVatNumber = item.customerVatNumber
		current.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Customer()
		item.customerId = id
		try item.delete()
	}
}
