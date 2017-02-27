//
//  Store.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Store: PostgresSqlORM, JSONConvertible {
    
    public var storedId		: Int = 0
    public var storeName	: String = ""
    public var storeAddress	: String = ""
    public var storeCity	: String = ""
    public var storeCountry	: String = ""
    public var storeZip		: String = ""
    public var created      : Int = Int.now()
    public var updated      : Int = Int.now()
    
    open override func table() -> String { return "brands" }
    
    open override func to(_ this: StORMRow) {
        storedId        = this.data["storedid"] as? Int         ?? 0
        storeName       = this.data["storename"] as? String     ?? ""
        storeAddress	= this.data["storeaddress"] as? String  ?? ""
        storeCity       = this.data["storecity"] as? String     ?? ""
        storeCountry    = this.data["storecountry"] as? String  ?? ""
        storeZip        = this.data["storezip"] as? String      ?? ""
        created         = this.data["created"] as? Int          ?? 0
        updated         = this.data["updated"] as? Int          ?? 0
    }
    
    func rows() -> [Brand] {
        var rows = [Brand]()
        for i in 0..<self.results.rows.count {
            let row = Brand()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.storedId =     getJSONValue(named: "storedId",     from: values, defaultValue: 0)
        self.storeName =    getJSONValue(named: "storeName",    from: values, defaultValue: "")
        self.storeAddress = getJSONValue(named: "storeAddress", from: values, defaultValue: "")
        self.storeCity =    getJSONValue(named: "storeCity",    from: values, defaultValue: "")
        self.storeCountry = getJSONValue(named: "storeCountry", from: values, defaultValue: "")
        self.storeZip =     getJSONValue(named: "storeZip",     from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "storedId": storedId,
            "storeName": storeName,
            "storeAddress":	storeAddress,
            "storeCity": storeCity,
            "storeCountry": storeCountry,
            "storeZip": storeZip
//            "created": created.formatDate(),
//            "updated": updated.formatDate()
        ]
    }
}
