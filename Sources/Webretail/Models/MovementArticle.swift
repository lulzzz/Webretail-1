//
//  MovementArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import Foundation
import StORM

class MovementArticle: PostgresSqlORM, Codable {
    
    public var movementArticleId : Int = 0
    public var movementId : Int = 0
    public var movementArticleBarcode : String = ""
    public var movementArticleProduct : Product = Product()
    public var movementArticleQuantity : Double = 0
    public var movementArticleDelivered : Double = 0
	public var movementArticlePrice : Double = 0
	public var movementArticleUpdated : Int = Int.now()
    
    public var _movementArticleAmount: Double {
        return (movementArticleQuantity * movementArticlePrice).roundCurrency()
    }

    private enum CodingKeys: String, CodingKey {
        case movementArticleId
        case movementId
        case movementArticleBarcode
        case movementArticleProduct
        case movementArticleQuantity
        case movementArticleDelivered
        case movementArticlePrice
        case _movementArticleAmount = "movementArticleAmount"
    }

    open override func table() -> String { return "movementarticles" }
      
    open override func to(_ this: StORMRow) {
        movementArticleId = this.data["movementarticleid"] as? Int ?? 0
        movementId = this.data["movementid"] as? Int ?? 0
        movementArticleBarcode = this.data["movementarticlebarcode"] as? String ?? ""
        movementArticleQuantity = Double(this.data["movementarticlequantity"] as? Float ?? 0)
        movementArticleDelivered = Double(this.data["movementarticledelivered"] as? Float ?? 0)
        movementArticlePrice = Double(this.data["movementarticleprice"] as? Float ?? 0)
		movementArticleUpdated = this.data["movementarticleupdated"] as? Int ?? 0
        if let product = this.data["movementarticleproduct"] as? [String:Any] {
            let jsonData = try! JSONSerialization.data(withJSONObject: product, options: [])
            movementArticleProduct = try! JSONDecoder().decode(Product.self, from: jsonData)
        }
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
    
    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        movementArticleId = try container.decodeIfPresent(Int.self, forKey: .movementArticleId) ?? 0
        movementId = try container.decodeIfPresent(Int.self, forKey: .movementId) ?? 0
        movementArticleBarcode = try container.decode(String.self, forKey: .movementArticleBarcode)
        movementArticleProduct = try container.decodeIfPresent(Product.self, forKey: .movementArticleProduct) ?? Product()
        movementArticleQuantity = try container.decode(Double.self, forKey: .movementArticleQuantity)
        movementArticleDelivered = try container.decode(Double.self, forKey: .movementArticleDelivered)
        movementArticlePrice = try container.decode(Double.self, forKey: .movementArticlePrice)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(movementArticleId, forKey: .movementArticleId)
        try container.encode(movementId, forKey: .movementId)
        try container.encode(movementArticleBarcode, forKey: .movementArticleBarcode)
        try container.encode(movementArticleProduct, forKey: .movementArticleProduct)
        try container.encode(movementArticleQuantity, forKey: .movementArticleQuantity)
        try container.encode(movementArticleDelivered, forKey: .movementArticleDelivered)
        try container.encode(movementArticlePrice, forKey: .movementArticlePrice)
        try container.encode(_movementArticleAmount, forKey: ._movementArticleAmount)
    }
}
