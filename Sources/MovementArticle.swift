//
//  MovementArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class MovementArticle: PostgresSqlORM, JSONConvertible {
    
    public var movementArticleId : Int = 0
    public var movementId : Int = 0
    public var barcode : String = ""
    public var product : [String:Any] = [String:Any]()
    public var quantity : Double = 0
	public var price : Double = 0
	public var updated : Int = Int.now()
	
    open override func table() -> String { return "movementarticles" }
      
    open override func to(_ this: StORMRow) {
        movementArticleId = this.data["movementarticleid"] as? Int ?? 0
        movementId = this.data["movementid"] as? Int ?? 0
        barcode = this.data["barcode"] as? String ?? ""
        product = this.data["product"] as? [String:Any] ?? [String:Any]()
        quantity = Double(this.data["quantity"] as? Float ?? 0)
		price = Double(this.data["price"] as? Float ?? 0)
		updated = this.data["updated"] as? Int ?? 0
    }
    
    func rows() -> [MovementArticle] {
        var rows = [MovementArticle]()
        for i in 0..<self.results.rows.count {
            let row = MovementArticle()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.movementArticleId = getJSONValue(named: "movementArticleId", from: values, defaultValue: 0)
        self.movementId = getJSONValue(named: "movementId", from: values, defaultValue: 0)
        self.barcode = getJSONValue(named: "barcode", from: values, defaultValue: "")
        self.product = getJSONValue(named: "product", from: values, defaultValue: [String:Any]())
        self.quantity = getJSONValue(named: "quantity", from: values, defaultValue: 1.0)
		self.price = getJSONValue(named: "price", from: values, defaultValue: 0.0)
    }
	
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementArticleId": movementArticleId,
            "movementId": movementId,
            "barcode": barcode,
            "product": product,
            "quantity": quantity.roundCurrency(),
            "price": price.roundCurrency(),
            "amount": (quantity * price).roundCurrency()
        ]
    }
}
