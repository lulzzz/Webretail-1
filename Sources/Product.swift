//
//  Product.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Product: PostgresStORM, JSONConvertible {
    
    public var productId	: Int = 0
    public var brandId      : Int = 0
    public var productCode	: String = ""
    public var productName	: String = ""
    public var productUm	: String = ""
    public var productPrice	: Double = 0
    public var created      : Int = Helper.now()
    public var updated      : Int = Helper.now()
    
    open override func table() -> String { return "products" }
    
    open override func to(_ this: StORMRow) {
        productId       = this.data["productid"] as? Int        ?? 0
        brandId         = this.data["brandid"] as? Int          ?? 0
        productCode     = this.data["productcode"] as? String   ?? ""
        productName     = this.data["productname"] as? String   ?? ""
        productUm       = this.data["productum"] as? String     ?? ""
        productPrice    = Double(this.data["productprice"] as? Float ?? 0)
        created         = this.data["created"] as? Int          ?? 0
        updated         = this.data["updated"] as? Int          ?? 0
    }
    
    func rows() -> [Product] {
        var rows = [Product]()
        for i in 0..<self.results.rows.count {
            let row = Product()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "productId": productId,
            "brandId": brandId,
            "productCode": productCode,
            "productName": productName,
            "productUm": productUm,
            "productPrice": Helper.roundCurrency(value: productPrice),
            "created": Helper.formatDate(unixdate: created),
            "updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
