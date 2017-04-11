//
//  CompanyRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM
import TurnstileCrypto

struct CompanyRepository : CompanyProtocol {
		
	func get() throws -> Company? {
		let item = Company()
		try item.query()
		
		return item
	}
	
	func update(item: Company) throws {
		try item.save()
	}
}
