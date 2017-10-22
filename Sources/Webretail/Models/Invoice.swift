//
//  Invoice.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 05/04/17.
//
//

import Foundation
import StORM

class Invoice: PostgresSqlORM, Codable {
	
	public var invoiceId : Int = 0
	public var invoiceNumber : Int = 0
	public var invoiceDate : Int = Int.now()
	public var invoiceCustomer : Customer = Customer()
	public var invoicePayment : String = ""
	public var invoiceNote : String = ""
	public var invoiceAmount : Double = 0
	public var invoiceUpdated : Int = Int.now()
	
	open override func table() -> String { return "invoices" }
	
	open override func to(_ this: StORMRow) {
		invoiceId = this.data["invoiceid"] as? Int ?? 0
		invoiceNumber = this.data["invoicenumber"] as? Int ?? 0
		invoiceDate = this.data["invoicedate"] as? Int ?? 0
		invoiceCustomer = this.data["invoicecustomer"] as? Customer ?? Customer()
		invoicePayment = this.data["invoicepayment"] as? String ?? ""
		invoiceNote = this.data["invoicenote"] as? String ?? ""
		invoiceUpdated = this.data["invoiceupdated"] as? Int ?? 0
	}
	
	func rows() throws -> [Invoice] {
		var rows = [Invoice]()
		for i in 0..<self.results.rows.count {
			let row = Invoice()
			row.to(self.results.rows[i])

			let sql = "SELECT SUM(a.movementArticleQuantity * a.movementArticlePrice) AS amount " +
				"FROM movementArticles AS a " +
				"INNER JOIN movements AS b ON a.movementId = b.movementId " +
				"WHERE b.invoiceId = $1"
			let getCount = try self.sqlRows(sql, params: [String(row.invoiceId)])
			row.invoiceAmount = Double(getCount.first?.data["amount"] as? Float ?? 0)

			rows.append(row)
		}
		return rows
	}

	func makeNumber() throws {
		let now = Date()
		let calendar = Calendar.current
		
		var dateComponents = DateComponents()
		dateComponents.year = calendar.component(.year, from: now)
		dateComponents.month = 1
		dateComponents.day = 1
		dateComponents.timeZone = TimeZone(abbreviation: "UTC")
		dateComponents.hour = 0
		dateComponents.minute = 0

		let date = calendar.date(from: dateComponents)
		
		self.invoiceNumber = 1
		let sql = "SELECT MAX(invoicenumber) AS counter FROM \(table()) WHERE invoicedate > $1";
		let getCount = try self.sqlRows(sql, params: [String(describing: Int((date?.timeIntervalSinceReferenceDate)!))])
		self.invoiceNumber += getCount.first?.data["counter"] as? Int ?? 0
	}
}
