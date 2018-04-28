//
//  CompanyRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 11/04/17.
//
//

import StORM

struct CompanyRepository : CompanyProtocol {
		
	func get() throws -> Company? {
		let item = Company()
		try item.query(id: 1)
		
		return item
	}
	
	func save(item: Company) throws {
		
		guard let current = try get() else {
            try item.save {
                id in item.companyId = id as! Int
            }
            return
		}
		
		current.companyName = item.companyName
		current.companyDescription = item.companyDescription
		current.companyWebsite = item.companyWebsite
		current.companyAddress = item.companyAddress
		current.companyCity = item.companyCity
		current.companyZip = item.companyZip
        current.companyProvince = item.companyProvince
        current.companyCountry = item.companyCountry
        current.companyVatNumber = item.companyVatNumber

        current.companyPhone = item.companyPhone
        current.companyEmailInfo = item.companyEmailInfo
        current.companyEmailSales = item.companyEmailSales
        current.companyEmailSupport = item.companyEmailSupport
        
        current.companyCurrency = item.companyCurrency
        current.companyUtc = item.companyUtc
        current.companyLocales = item.companyLocales

        current.barcodeCounterPublic = item.barcodeCounterPublic
        current.barcodeCounterPrivate = item.barcodeCounterPrivate

        current.smtpHost = item.smtpHost
		current.smtpSsl = item.smtpSsl
		current.smtpUsername = item.smtpUsername
		current.smtpPassword = item.smtpPassword

        current.cashOnDelivery = item.cashOnDelivery
        current.paypalEnv = item.paypalEnv
        current.paypalSandbox = item.paypalSandbox
        current.paypalProduction = item.paypalProduction
        current.bankName = item.bankName
        current.bankIban = item.bankIban

        current.shippingStandard = item.shippingStandard
        current.shippingExpress = item.shippingExpress

        try current.save()
	}
}
