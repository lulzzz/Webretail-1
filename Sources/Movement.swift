//
//  Movement.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 28/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

struct MovementStatus: JSONConvertible {
	public var value: String
	
	func getJSONValues() -> [String : Any] {
		return ["value": value]
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
}

class Movement: PostgresSqlORM, JSONConvertible {
    
    public var movementId : Int = 0
    public var storeId : Int = 0
    public var causalId : Int = 0
	public var customerId : Int = 0
	public var movementNumber : Int = 0
	public var movementDate : Int = Int.now()
	public var movementDesc : String = ""
    public var movementNote : String = ""
	public var movementStatus : String = ""
	public var updated : Int = Int.now()
    
    public var _store : Store = Store()
    public var _causal : Causal = Causal()
	public var _customer : Customer = Customer()
	
    open override func table() -> String { return "movements" }
    
    open override func to(_ this: StORMRow) {
        movementId = this.data["movementid"] as? Int ?? 0
        storeId = this.data["storeid"] as? Int ?? 0
        causalId = this.data["causalid"] as? Int ?? 0
		customerId = this.data["customerid"] as? Int ?? 0
		movementNumber = this.data["movementnumber"] as? Int ?? 0
		movementDate = this.data["movementdate"] as? Int ?? 0
		movementDesc = this.data["movementdesc"] as? String  ?? ""
        movementNote = this.data["movementnote"] as? String  ?? ""
		movementStatus = this.data["movementstatus"] as? String ?? ""
		updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() throws -> [Movement] {
        var rows = [Movement]()
        for i in 0..<self.results.rows.count {
            let row = Movement()
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
        self.movementId =  getJSONValue(named: "movementId", from: values, defaultValue: 0)
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
		self.movementNumber = getJSONValue(named: "movementNumber", from: values, defaultValue: 0)
		self.movementDate = getJSONValue(named: "movementDate", from: values, defaultValue: "").DateToInt()
        self.movementDesc = getJSONValue(named: "movementDesc", from: values, defaultValue: "")
        self.movementNote = getJSONValue(named: "movementNote", from: values, defaultValue: "")
		self.movementStatus = getJSONValue(named: "movementStatus", from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementId": movementId,
            "store": _store,
            "causal": _causal,
            "customer": _customer,
            "movementNumber": movementNumber,
            "movementDate": movementDate.formatDate(),
            "movementDesc": movementDesc,
            "movementNote": movementNote,
            "movementStatus": movementStatus,
            "updated": updated.formatDate()
        ]
    }

	func newNumber() throws {
		let getCount = try self.sqlRows("SELECT MAX(movementnumber) AS counter FROM \(table())", params: [])
		self.movementNumber = 1
		self.movementNumber += getCount.first?.data["counter"] as? Int ?? 1000
	}
}
