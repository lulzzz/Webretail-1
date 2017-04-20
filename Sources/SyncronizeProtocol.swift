//
//  SyncronizeProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 20/04/17.
//
//

protocol SyncronizeProtocol {
	
	func getCausals(date: Int) throws -> [Causal]

	func getCustomers(date: Int) throws -> [Customer]

	func getProducts(date: Int) throws -> [Product]
}
