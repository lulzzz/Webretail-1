//
//  Basket.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

//
//  Basket.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/10/2017.
//
//

import Foundation
import StORM

class Basket: PostgresSqlORM, Codable {
    
    public var basketId : Int = 0
    public var customerId : Int = 0
    public var basketBarcode : String = ""
    public var basketProduct : Product = Product()
    public var basketQuantity : Double = 0
    public var basketPrice : Double = 0
    public var basketUpdated : Int = Int.now()
    
    public var _basketAmount: Double {
        return (basketQuantity * basketPrice).roundCurrency()
    }
    
    private enum CodingKeys: String, CodingKey {
        case basketId
        case customerId
        case basketBarcode
        case basketProduct
        case basketQuantity
        case basketPrice
        case _basketAmount = "basketAmount"
    }
    
    open override func table() -> String { return "baskets" }
    
    open override func to(_ this: StORMRow) {
        basketId = this.data["basketid"] as? Int ?? 0
        customerId = this.data["customerid"] as? Int ?? 0
        basketBarcode = this.data["basketbarcode"] as? String ?? ""
        basketQuantity = Double(this.data["basketquantity"] as? Float ?? 0)
        basketPrice = Double(this.data["basketprice"] as? Float ?? 0)
        basketUpdated = this.data["basketupdated"] as? Int ?? 0
        if let product = this.data["basketproduct"] as? [String:Any] {
            let jsonData = try! JSONSerialization.data(withJSONObject: product, options: [])
            basketProduct = try! JSONDecoder().decode(Product.self, from: jsonData)
        }
    }
    
    func rows() -> [Basket] {
        var rows = [Basket]()
        for i in 0..<self.results.rows.count {
            let row = Basket()
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
        basketId = try container.decode(Int.self, forKey: .basketId)
        customerId = try container.decode(Int.self, forKey: .customerId)
        basketBarcode = try container.decode(String.self, forKey: .basketBarcode)
        let product = Product()
        try product.get(barcode: basketBarcode)
        if product.productId > 0 {
            basketProduct = product
        } else {
            basketProduct = try container.decode(Product.self, forKey: .basketProduct)
        }
        basketQuantity = try container.decode(Double.self, forKey: .basketQuantity)
        basketPrice = try container.decode(Double.self, forKey: .basketPrice)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(basketId, forKey: .basketId)
        try container.encode(customerId, forKey: .customerId)
        try container.encode(basketBarcode, forKey: .basketBarcode)
        try container.encode(basketProduct, forKey: .basketProduct)
        try container.encode(basketQuantity, forKey: .basketQuantity)
        try container.encode(basketPrice, forKey: .basketPrice)
        try container.encode(_basketAmount, forKey: ._basketAmount)
    }
}

