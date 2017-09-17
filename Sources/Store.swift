//
//  Store.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class Store: PostgresSqlORM, Codable {
    
    public var storeId : Int = 0
    public var storeName	: String = ""
    public var storeAddress	: String = ""
    public var storeCity : String = ""
    public var storeCountry	: String = ""
    public var storeZip	: String = ""
    public var storeCreated : Int = Int.now()
    public var storeUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case storeId
        case storeName
        case storeAddress
        case storeCity
        case storeCountry
        case storeZip
        case storeUpdated = "updatedAt"
    }

    open override func table() -> String { return "stores" }
    open override func tableIndexes() -> [String] { return ["storeName"] }
  
    open override func to(_ this: StORMRow) {
        storeId = this.data["storeid"] as? Int ?? 0
        storeName = this.data["storename"] as? String ?? ""
        storeAddress = this.data["storeaddress"] as? String ?? ""
        storeCity = this.data["storecity"] as? String ?? ""
        storeCountry = this.data["storecountry"] as? String ?? ""
        storeZip = this.data["storezip"] as? String ?? ""
        storeCreated = this.data["storecreated"] as? Int ?? 0
        storeUpdated = this.data["storeupdated"] as? Int ?? 0
    }
    
    func rows() -> [Store] {
        var rows = [Store]()
        for i in 0..<self.results.rows.count {
            let row = Store()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
}
