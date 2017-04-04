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
    public var movementArticleBarcode : String = ""
    public var movementArticleProduct : [String:Any] = [String:Any]()
    public var movementArticleQuantity : Double = 0
	public var movementArticlePrice : Double = 0
	public var movementArticleUpdated : Int = Int.now()
	
    open override func table() -> String { return "movementarticles" }
      
    open override func to(_ this: StORMRow) {
        movementArticleId = this.data["movementarticleid"] as? Int ?? 0
        movementId = this.data["movementid"] as? Int ?? 0
        movementArticleBarcode = this.data["movementarticlebarcode"] as? String ?? ""
        movementArticleProduct = this.data["movementarticleproduct"] as? [String:Any] ?? [String:Any]()
        movementArticleQuantity = Double(this.data["movementarticlequantity"] as? Float ?? 0)
		movementArticlePrice = Double(this.data["movementarticleprice"] as? Float ?? 0)
		movementArticleUpdated = this.data["movementarticleupdated"] as? Int ?? 0
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
        self.movementArticleBarcode = getJSONValue(named: "movementArticleBarcode", from: values, defaultValue: "")
        self.movementArticleProduct = getJSONValue(named: "movementArticleProduct", from: values, defaultValue: [String:Any]())
        self.movementArticleQuantity = getJSONValue(named: "movementArticleQuantity", from: values, defaultValue: 1.0)
		self.movementArticlePrice = getJSONValue(named: "movementArticlePrice", from: values, defaultValue: 0.0)
    }
	
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementArticleId": movementArticleId,
            "movementId": movementId,
            "movementArticleBarcode": movementArticleBarcode,
            "movementArticleProduct": movementArticleProduct,
            "movementArticleQuantity": movementArticleQuantity.roundCurrency(),
            "movementArticlePrice": movementArticlePrice.roundCurrency(),
            "movementArticleAmount": (movementArticleQuantity * movementArticlePrice).roundCurrency()
        ]
    }
}
