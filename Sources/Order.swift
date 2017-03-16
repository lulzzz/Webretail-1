//
//  Order.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 14/03/17.
//
//

import Foundation
import StORM
import PostgresStORM
import PerfectLib

struct OrderStatus: JSONConvertible {
	public var value: String
	
	func getJSONValues() -> [String : Any] {
		return ["value": value]
	}

	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
}

class Order: PostgresSqlORM, JSONConvertible {
	
	public var orderId : Int = 0
	public var storeId : Int = 0
	public var causalId : Int = 0
	public var customerId : Int = 0
	public var orderNumber : Int = 0
	public var orderDate : Int = 0
	public var orderNote : String = ""
	public var orderStatus : String = ""
	public var created : Int = Int.now()
	public var updated : Int = Int.now()
	
	public var _store : Store = Store()
	public var _causal : Causal = Causal()
	public var _customer : Customer = Customer()
	
	open override func table() -> String { return "orders" }
	open override func tableIndexes() -> [String] { return ["orderNumber"] }
	
	open override func to(_ this: StORMRow) {
		orderId = this.data["orderid"] as? Int ?? 0
		storeId = this.data["storeid"] as? Int ?? 0
		causalId = this.data["causalid"] as? Int ?? 0
		customerId = this.data["customerid"] as? Int ?? 0
		orderNumber = this.data["ordernumber"] as? Int ?? 0
		orderDate = this.data["orderdate"] as? Int ?? 0
		orderNote = this.data["ordernote"] as? String  ?? ""
		orderStatus = this.data["orderstatus"] as? String ?? ""
		created = this.data["created"] as? Int ?? 0
		updated = this.data["updated"] as? Int ?? 0
	}
	
	func rows() throws -> [Order] {
		var rows = [Order]()
		for i in 0..<self.results.rows.count {
			let row = Order()
			row.to(self.results.rows[i])
			
			// get store
			let store = Store()
			try store.get(row.storeId)
			row._store = store
			
			// get causal
			let causal = Causal()
			try causal.get(row.causalId)
			row._causal = causal

			// get customer
			let customer = Customer()
			try customer.get(row.customerId)
			row._customer = customer
			
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.orderId =  getJSONValue(named: "orderId", from: values, defaultValue: 0)
		let store = Store()
		store.setJSONValues(getJSONValue(named: "store", from: values, defaultValue: [String:Any]()))
		self._store = store
		self.storeId =  store.storeId
		let causal = Causal()
		causal.setJSONValues(getJSONValue(named: "causal", from: values, defaultValue: [String:Any]()))
		self._causal = causal
		self.causalId =  causal.causalId
		let customer = Customer()
		customer.setJSONValues(getJSONValue(named: "customer", from: values, defaultValue: [String:Any]()))
		self._customer = customer
		self.customerId =  customer.customerId
		self.orderNumber = getJSONValue(named: "orderNumber", from: values, defaultValue: 0)
		self.orderDate = getJSONValue(named: "orderDate", from: values, defaultValue: "").DateToInt()
		self.orderNote = getJSONValue(named: "orderNote", from: values, defaultValue: "")
		self.orderStatus = getJSONValue(named: "orderStatus", from: values, defaultValue: "")
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"orderId": orderId,
			"store": _store,
			"causal": _causal,
			"customer": _customer,
			"orderNumber": orderNumber,
			"orderDate": orderDate.formatDate(),
			"orderNote": orderNote,
			"orderStatus": orderStatus,
			"created": created.formatDate(),
			"updated": updated.formatDate()
		]
	}
}
