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

class Movement: PostgresSqlORM, JSONConvertible {
    
    public var movementId : Int = 0
    public var storeId : Int = 0
    public var causalId : Int = 0
    public var movementDesc : String = ""
    public var movementNote : String = ""
    public var movementUser : String = ""
	public var committed : Bool = false
    public var created : Int = Int.now()
    public var updated : Int = Int.now()
    
    public var _store : Store = Store()
    public var _causal : Causal = Causal()
    
    open override func table() -> String { return "movements" }
    
    open override func to(_ this: StORMRow) {
        movementId = this.data["movementid"] as? Int ?? 0
        storeId = this.data["storeid"] as? Int ?? 0
        causalId = this.data["causalid"] as? Int ?? 0
        movementDesc = this.data["movementdesc"] as? String  ?? ""
        movementNote = this.data["movementnote"] as? String  ?? ""
        movementUser = this.data["movementuser"] as? String  ?? ""
		committed = this.data["committed"] as? Bool ?? false
        created = this.data["created"] as? Int ?? 0
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
        self.movementDesc = getJSONValue(named: "movementDesc", from: values, defaultValue: "")
        self.movementNote = getJSONValue(named: "movementNote", from: values, defaultValue: "")
        self.movementUser = getJSONValue(named: "movementUser", from: values, defaultValue: "")
		self.movementUser = getJSONValue(named: "movementUser", from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementId": movementId,
            "store": _store,
            "causal": _causal,
            "movementDesc": movementDesc,
            "movementNote": movementNote,
            "movementUser": movementUser,
            "committed": committed,
            "created": created.formatDate(),
            "updated": updated.formatDate()
        ]
    }
}
