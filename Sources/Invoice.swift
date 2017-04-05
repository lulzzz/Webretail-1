//
//  Invoice.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 05/04/17.
//
//

import Foundation
import StORM
import PostgresStORM
import PerfectLib

class Invoice: PostgresSqlORM, JSONConvertible {
	
	public var invoiceId : Int = 0
	public var invoiceNumber : Int = 0
	public var invoiceDate : Int = Int.now()
	public var invoiceCustomer : [String:Any] = [String:Any]()
	public var invoiceNote : String = ""
	public var invoiceUpdated : Int = Int.now()
	
	open override func table() -> String { return "invoices" }
	
	open override func to(_ this: StORMRow) {
		invoiceId = this.data["invoiceid"] as? Int ?? 0
		invoiceNumber = this.data["invoicenumber"] as? Int ?? 0
		invoiceDate = this.data["invoicedate"] as? Int ?? 0
		invoiceCustomer = this.data["invoicecustomer"] as? [String:Any] ?? [String:Any]()
		invoiceNote = this.data["invoicenote"] as? String ?? ""
		invoiceUpdated = this.data["invoiceupdated"] as? Int ?? 0
	}
	
	func rows() -> [Invoice] {
		var rows = [Invoice]()
		for i in 0..<self.results.rows.count {
			let row = Invoice()
			row.to(self.results.rows[i])
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.invoiceId = getJSONValue(named: "invoiceId", from: values, defaultValue: 0)
		self.invoiceNumber = getJSONValue(named: "invoiceNumber", from: values, defaultValue: 0)
		self.invoiceDate = getJSONValue(named: "invoiceDate", from: values, defaultValue: "").DateToInt()
		self.invoiceCustomer = getJSONValue(named: "invoiceCustomer", from: values, defaultValue: [String:Any]())
		self.invoiceNote = getJSONValue(named: "invoiceNote", from: values, defaultValue: "")
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"invoiceId": invoiceId,
			"invoiceNumber": invoiceNumber,
			"invoiceDate": invoiceDate,
			"invoiceCustomer": invoiceCustomer,
			"invoiceNote": invoiceNote,
			"invoiceUpdated": invoiceUpdated.formatDateShort()
		]
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
		let getCount = try self.sqlRows(sql, params: [String(describing: date?.timeIntervalSinceReferenceDate)])
		self.invoiceNumber += getCount.first?.data["counter"] as? Int ?? 0
	}
}
