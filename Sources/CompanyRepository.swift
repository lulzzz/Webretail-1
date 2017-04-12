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
	
	func add(item: Company) throws {
		try item.save {
			id in item.companyId = id as! Int
		}
	}

	func update(item: Company) throws {
		
		guard let current = try get() else {
			throw StORMError.noRecordFound
		}
		
		current.companyName = item.companyName
		current.companyDesc = item.companyDesc
		current.companyWebsite = item.companyWebsite
		current.companyEmail = item.companyEmail
		current.companyPhone = item.companyPhone
		current.companyFiscalCode = item.companyFiscalCode
		current.companyVatNumber = item.companyVatNumber
		current.companyAddress = item.companyAddress
		current.companyCity = item.companyCity
		current.companyZip = item.companyZip
		current.companyCountry = item.companyCountry
		
		current.smtpServer = item.smtpServer
		current.smtpPort = item.smtpPort
		current.smtpSsl = item.smtpSsl
		current.smtpUsername = item.smtpUsername
		current.smtpPassword = item.smtpPassword
		try current.save()
	}
}
