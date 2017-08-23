//
//  Product.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class Product: PostgresSqlORM, JSONConvertible {
    
    public var productId : Int = 0
    public var brandId : Int = 0
    public var productCode : String = ""
    public var productName : String = ""
    public var productUm : String = ""
    public var productSellingPrice : Double = 0
    public var productPurchasePrice : Double = 0
    public var productIsActive : Bool = false
    public var productIsValid : Bool = false
    public var productCreated : Int = Int.now()
    public var productUpdated : Int = Int.now()
    
	public var _brand: Brand = Brand()
    public var _categories: [ProductCategory] = [ProductCategory]()
    public var _attributes: [ProductAttribute] = [ProductAttribute]()
    public var _articles: [Article] = [Article]()
	public var _discount : Discount?
	
    open override func table() -> String { return "products" }
    open override func tableIndexes() -> [String] { return ["productCode", "productName"] }

    open override func to(_ this: StORMRow) {
        productId = this.data["productid"] as? Int ?? 0
        brandId = this.data["brandid"] as? Int ?? 0
        productCode = this.data["productcode"] as? String ?? ""
        productName = this.data["productname"] as? String ?? ""
        productUm = this.data["productum"] as? String ?? ""
        productSellingPrice = this.data["productsellingprice"] as? Double ?? 0
        productPurchasePrice = this.data["productpurchaseprice"] as? Double ?? 0
        productIsActive = this.data["productisactive"] as? Bool ?? true
        productIsValid = this.data["productisvalid"] as? Bool ?? true
        productCreated = this.data["productcreated"] as? Int ?? 0
        productUpdated = this.data["productupdated"] as? Int ?? 0
		_brand.to(this)
    }
    
	func rows(barcodes: Bool) throws -> [Product] {
        var rows = [Product]()
        for i in 0..<self.results.rows.count {
            let row = Product()
            row.to(self.results.rows[i])
			
            try row.makeDiscount();
			try row.makeCategories();
			
			if barcodes {
				try row.makeAttributes();
				try row.makeArticles();
			}
			
			rows.append(row)
        }
        return rows
    }
    
    func setJSONValues(_ values:[String:Any]) {
        self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.productCode = getJSONValue(named: "productCode", from: values, defaultValue: "")
        self.productName = getJSONValue(named: "productName", from: values, defaultValue: "")
        self.productUm = getJSONValue(named: "productUm", from: values, defaultValue: "")
        self.productSellingPrice = getJSONValue(named: "productSellingPrice", from: values, defaultValue: 0.0)
        self.productPurchasePrice = getJSONValue(named: "productPurchasePrice", from: values, defaultValue: 0.0)
        self.productIsActive = getJSONValue(named: "productIsActive", from: values, defaultValue: false)
        self.productIsValid = getJSONValue(named: "productIsValid", from: values, defaultValue: false)
		self._brand.setJSONValues(values["brand"] as! [String : Any])
		self.brandId = self._brand.brandId
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
            "productSellingPrice": productSellingPrice.roundCurrency(),
            "productPurchasePrice": productPurchasePrice.roundCurrency(),
            "productIsActive": productIsActive,
            "productIsValid": productIsValid,
            "brand": _brand,
            "categories": _categories,
            "attributes": _attributes,
            "articles": _articles,
            "discount": _discount as Any,
            "updatedAt": productUpdated
        ]
    }
	
	func makeDiscount() throws {
		let discount = Discount()
		try discount.get(productId: self.productId)
		if discount.discountId > 0 {
			discount.makeDiscount(sellingPrice: self.productSellingPrice)
			self._discount = discount
		}
	}

	func makeCategories() throws {
		var categoryJoin = StORMDataSourceJoin()
		categoryJoin.table = "categories"
		categoryJoin.direction = StORMJoinType.INNER
		categoryJoin.onCondition = "productcategories.categoryId = categories.categoryId"
		
		let productCategory = ProductCategory()
		try productCategory.query(
			whereclause: "productcategories.productId = $1",
			params: [self.productId],
			orderby: ["categories.categoryId"],
			joins: [categoryJoin]
		)
		self._categories = try productCategory.rows()
	}

	func makeAttributes() throws {
		var attributeJoin = StORMDataSourceJoin()
		attributeJoin.table = "attributes"
		attributeJoin.direction = StORMJoinType.INNER
		attributeJoin.onCondition = "productattributes.attributeId = attributes.attributeId"
		
		let productAttribute = ProductAttribute()
		try productAttribute.query(
			whereclause: "productattributes.productId = $1",
			params: [self.productId],
			orderby: ["productattributes.productAttributeId"],
			joins: [attributeJoin]
		)
		self._attributes = try productAttribute.rows()
	}

	func makeArticles() throws {
		let article = Article()
		try article.query(
			whereclause: "productId = $1",
			params: [self.productId],
			orderby: ["articleId"]
		)
		self._articles = try article.rows()
	}

	func makeArticle(barcode: String) throws {
		let article = Article()
		try article.query(
			whereclause: "productId = $1 AND articleBarcode = $2",
			params: [self.productId, barcode]
		)
		self._articles = try article.rows()
	}
}
