//
//  RegistryRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/03/17.
//
//

import StORM
import TurnstileCrypto

struct RegistryRepository : RegistryProtocol {

	func getAll(date: Int) throws -> [Registry] {
		let items = Registry()
		try items.query(whereclause: "registryUpdated > $1", params: [date])
		
		return items.rows()
	}
	
	func get(id: Int) throws -> Registry? {
		let item = Registry()
		try item.query(id: id)
		
		return item
	}
	
	func add(item: Registry) throws {
        if (item.registryPassword.isEmpty) {
            let random: URandom =  URandom()
            let password = String(random.secureToken)
            item.registryPassword = BCrypt.hash(password: password)
        }
		item.registryCreated = Int.now()
		item.registryUpdated = Int.now()
		try item.save {
			id in item.registryId = id as! Int
		}
	}
	
	func update(id: Int, item: Registry) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
        if (item.registryPassword.length >= 8 && item.registryPassword.length <= 20) {
            current.registryPassword = BCrypt.hash(password: item.registryPassword)
        }

		current.registryName = item.registryName
		current.registryEmail = item.registryEmail
		current.registryPhone = item.registryPhone
		current.registryAddress = item.registryAddress
		current.registryCity = item.registryCity
		current.registryZip = item.registryZip
		current.registryCountry = item.registryCountry
		current.registryFiscalCode = item.registryFiscalCode
		current.registryVatNumber = item.registryVatNumber
		current.registryUpdated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Registry()
		item.registryId = id
		try item.delete()
	}
}
