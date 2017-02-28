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

class Product: PostgresSqlORM, JSONConvertible {
    
    public var productId        : Int = 0
    public var brandId          : Int = 0
    public var productCode      : String = ""
    public var productName      : String = ""
    public var productUm        : String = ""
    public var sellingPrice     : Double = 0
    public var purchasePrice    : Double = 0
    public var isActive         : Bool = false
    public var isValid          : Bool = false
    public var created          : Int = Int.now()
    public var updated          : Int = Int.now()
    
    public var _brand: Brand = Brand()
    public var _categories: [ProductCategory] = [ProductCategory]()
    public var _attributes: [ProductAttribute] = [ProductAttribute]()
    public var _articles: [Article] = [Article]()
    

    open override func table() -> String { return "products" }
    
    open override func to(_ this: StORMRow) {
        productId       = this.data["productid"] as? Int        ?? 0
        brandId         = this.data["brandid"] as? Int          ?? 0
        productCode     = this.data["productcode"] as? String   ?? ""
        productName     = this.data["productname"] as? String   ?? ""
        productUm       = this.data["productum"] as? String     ?? ""
        sellingPrice    = Double(this.data["sellingprice"] as? Float ?? 0)
        purchasePrice   = Double(this.data["purchaseprice"] as? Float ?? 0)
        isActive        = this.data["isactive"] as? Bool        ?? false
        isValid         = this.data["isvalid"] as? Bool         ?? false
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
            row._brand = brand

            // get categories
            let productCategory = ProductCategory()
            try productCategory.find([("productId", row.productId)])
            row._categories = try productCategory.rows()
            
            rows.append(row)
        }
        return rows
    }
    
    public func setJSONValues(_ values:[String:Any]) {
        self.productId =        getJSONValue(named: "productId",        from: values, defaultValue: 0)
        self.brandId =          getJSONValue(named: "brandId",          from: values["brand"] as! [String : Any], defaultValue: 0)
        self.productCode =      getJSONValue(named: "productCode",      from: values, defaultValue: "")
        self.productName =      getJSONValue(named: "productName",      from: values, defaultValue: "")
        self.productUm =        getJSONValue(named: "productUm",        from: values, defaultValue: "")
        self.sellingPrice =     getJSONValue(named: "sellingPrice",     from: values, defaultValue: 0.0)
        self.purchasePrice =    getJSONValue(named: "purchasePrice",    from: values, defaultValue: 0.0)
        self.productUm =        getJSONValue(named: "productUm",        from: values, defaultValue: "")
        self.isActive =         getJSONValue(named: "isActive",         from: values, defaultValue: false)
        self.isValid =          getJSONValue(named: "isValid",          from: values, defaultValue: false)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() throws -> [String : Any] {
        return [
            "productId": productId,
            "productCode": productCode,
            "productName": productName,
            "productUm": productUm,
            "sellingPrice": sellingPrice.roundCurrency(),
            "purchasePrice": purchasePrice.roundCurrency(),
            "isActive": isActive,
            "isValid": isValid,
            //"brandId": brandId,
            "brand": _brand,
            "categories": _categories,
            "attributes": _attributes,
            "articles": _articles,
            "created": created.formatDate(),
            "updated": updated.formatDate(),
        ]
    }
}
