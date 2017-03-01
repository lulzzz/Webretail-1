//
//  Stock.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 27/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Stock: PostgresSqlORM, JSONConvertible {
    
    public var stockId		: Int = 0
    public var storeId		: Int = 0
    public var articleId	: Int = 0
    public var quantity     : Double = 0
    public var booked       : Double = 0
    public var created      : Int = Int.now()
    public var updated      : Int = Int.now()
    
    open override func table() -> String { return "stocks" }
    
    open override func to(_ this: StORMRow) {
        stockId     = this.data["stockid"] as? Int              ?? 0
        storeId     = this.data["storeid"] as? Int              ?? 0
        articleId   = this.data["articleid"] as? Int            ?? 0
        quantity    = Double(this.data["quantity"] as? Float    ?? 0)
        booked      = Double(this.data["booked"] as? Float      ?? 0)
        created     = this.data["created"] as? Int              ?? 0
        updated     = this.data["updated"] as? Int              ?? 0
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
    
    public func setJSONValues(_ values:[String:Any]) {
        self.stockId =      getJSONValue(named: "stockId",      from: values, defaultValue: 0)
        self.storeId =      getJSONValue(named: "storeId",      from: values, defaultValue: 0)
        self.articleId =    getJSONValue(named: "articleId",    from: values, defaultValue: 0)
        self.quantity =     getJSONValue(named: "quantity",     from: values, defaultValue: 0)
        self.booked =       getJSONValue(named: "booked",       from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "stockId": stockId,
            "storeId": storeId,
            "articleId": articleId,
            "quantity": quantity,
            "booked": booked
        ]
    }
}
