//
//  Stock.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 27/02/17.
//
//

import StORM

class Stock: PostgresSqlORM, Codable {
    
    public var stockId : Int = 0
    public var storeId : Int = 0
    public var articleId : Int = 0
    public var stockQuantity : Double = 0
    public var stockBooked : Double = 0
    public var stockCreated : Int = Int.now()
    public var stockUpdated : Int = Int.now()
    
    open override func table() -> String { return "stocks" }
    
    open override func to(_ this: StORMRow) {
        stockId = this.data["stockid"] as? Int ?? 0
        storeId = this.data["storeid"] as? Int ?? 0
        articleId = this.data["articleid"] as? Int ?? 0
        stockQuantity = Double(this.data["stockquantity"] as? Float ?? 0)
        stockBooked = Double(this.data["stockbooked"] as? Float ?? 0)
        stockCreated = this.data["stockcreated"] as? Int ?? 0
        stockUpdated = this.data["stockupdated"] as? Int ?? 0
    }
    
    func rows() -> [Stock] {
        var rows = [Stock]()
        for i in 0..<self.results.rows.count {
            let row = Stock()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
}
