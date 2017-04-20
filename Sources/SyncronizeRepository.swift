//
//  SyncronizeRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 20/04/17.
//
//

import StORM

struct SyncronizeRepository : SyncronizeProtocol {
	
	func getCausals(date: Int) throws -> [Causal] {
		let items = Causal()
		try items.query(whereclause: "causalUpdated > $1", params: [date])
		
		return items.rows()
	}

	func getCustomers(date: Int) throws -> [Customer] {
		let items = Customer()
		try items.query(whereclause: "customerUpdated > $1", params: [date])
		
		return items.rows()
	}

	func getProducts(date: Int) throws -> [Product] {
		let items = Product()
		try items.query(whereclause: "productUpdated > $1", params: [date])
		
		var rows = [Product]()
		for i in 0..<items.results.rows.count {
			let row = Product()
			row.to(items.results.rows[i])
			
			try row.makeDiscount();
			try row.makeCategories();
			try row.makeAttributes();
			try row.makeArticles();

			rows.append(row)
		}
		
		return rows
	}
}
