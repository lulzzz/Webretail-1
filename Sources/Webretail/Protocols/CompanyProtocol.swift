//
//  CompanyProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

protocol CompanyProtocol {
	
	func get() throws -> Company?

	func save(item: Company) throws
}
