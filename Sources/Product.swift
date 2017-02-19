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
    
    public var internal_brand: Brand = Brand()
    public var internal_categories: [ProductCategory] = [ProductCategory]()
    public var internal_attributes: [ProductAttribute] = [ProductAttribute]()
    public var internal_articles: [Article] = [Article]()
    

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
    
    func rows() throws -> [Product] {
        var rows = [Product]()
        for i in 0..<self.results.rows.count {
            let row = Product()
            row.to(self.results.rows[i])

            // get brand
            let brand = Brand()
            try brand.get(row.brandId)
            row.internal_brand = brand

            // get categories
            let productCategory = ProductCategory()
            try productCategory.find([("productId", productId)])
            row.internal_categories = try productCategory.rows()
            
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.productId = Helper.getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.brandId = Helper.getJSONValue(named: "brandId", from: values["brand"] as! [String : Any], defaultValue: 0)
        self.productCode = Helper.getJSONValue(named: "productCode", from: values, defaultValue: "")
        self.productName = Helper.getJSONValue(named: "productName", from: values, defaultValue: "")
        self.productUm = Helper.getJSONValue(named: "productUm", from: values, defaultValue: "")
        self.productPrice = Helper.getJSONValue(named: "productPrice", from: values, defaultValue: 0.0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() throws -> [String : Any] {
        return [
            "productId": productId,
            "brandId": brandId,
            "productCode": productCode,
            "productName": productName,
            "productUm": productUm,
            "productPrice": Helper.roundCurrency(value: productPrice),
            "brand": internal_brand,
            "categories": internal_categories,
            "attributes": internal_attributes,
            "articles": internal_articles,
            "created": Helper.formatDate(unixdate: created),
            "updated": Helper.formatDate(unixdate: updated)
        ]
    }
}
