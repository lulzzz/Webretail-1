//
//  MyOrder.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 20/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class MyOrder: PostgresSqlORM, JSONConvertible {
	
	public var myOrderId : Int = 0
	public var storeId : Int = 0
	public var causalId : Int = 0
	public var myOrderNumber : Int = 0
	public var myOrderDate : Int = Int.now()
	public var myOrderSupplier : String = ""
	public var myOrderNote : String = ""
	public var myOrderStatus : String = ""
	public var updated : Int = Int.now()

	public var _store : Store = Store()
	public var _causal : Causal = Causal()

	open override func table() -> String { return "myorders" }
	open override func tableIndexes() -> [String] { return ["myordernumber"] }
	
	open override func to(_ this: StORMRow) {
		myOrderId = this.data["myorderid"] as? Int ?? 0
		storeId = this.data["storeid"] as? Int ?? 0
		causalId = this.data["causalid"] as? Int ?? 0
		myOrderNumber = this.data["myordernumber"] as? Int ?? 0
		myOrderDate = this.data["myorderdate"] as? Int ?? 0
		myOrderSupplier = this.data["myordersupplier"] as? String  ?? ""
		myOrderNote = this.data["myordernote"] as? String  ?? ""
		myOrderStatus = this.data["myorderstatus"] as? String ?? ""
		updated = this.data["updated"] as? Int ?? 0
	}
	
	func rows() throws -> [MyOrder] {
		var rows = [MyOrder]()
		for i in 0..<self.results.rows.count {
			let row = MyOrder()
			row.to(self.results.rows[i])
			
			// get store
			let store = Store()
			try store.get(row.storeId)
			row._store = store
			
			// get causal
			let causal = Causal()
			try causal.get(row.causalId)
			row._causal = causal
			
			rows.append(row)
		}
		return rows
	}
	
	public func setJSONValues(_ values:[String:Any]) {
		self.myOrderId =  getJSONValue(named: "myOrderId", from: values, defaultValue: 0)
		let store = Store()
		store.setJSONValues(getJSONValue(named: "store", from: values, defaultValue: [String:Any]()))
		self._store = store
		self.storeId =  store.storeId
		let causal = Causal()
		causal.setJSONValues(getJSONValue(named: "causal", from: values, defaultValue: [String:Any]()))
		self._causal = causal
		self.causalId =  causal.causalId
		self.myOrderNumber = getJSONValue(named: "myOrderNumber", from: values, defaultValue: 0)
		self.myOrderDate = getJSONValue(named: "myOrderDate", from: values, defaultValue: "").DateToInt()
		self.myOrderSupplier = getJSONValue(named: "myOrderSupplier", from: values, defaultValue: "")
		self.myOrderNote = getJSONValue(named: "myOrderNote", from: values, defaultValue: "")
		self.myOrderStatus = getJSONValue(named: "myOrderStatus", from: values, defaultValue: "")
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"myOrderId": myOrderId,
			"store": _store,
			"causal": _causal,
			"myOrderNumber": myOrderNumber,
			"myOrderDate": myOrderDate.formatDate(),
			"myOrderSupplier": myOrderSupplier,
			"myOrderNote": myOrderNote,
			"myOrderStatus": myOrderStatus,
			"updated": updated.formatDate()
			
			
		]
	}
}
