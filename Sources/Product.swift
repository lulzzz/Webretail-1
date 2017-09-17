//
//  Product.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class Product: PostgresSqlORM, Codable {
    
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
	
    private enum CodingKeys: String, CodingKey {
        case productId
        case productCode
        case productName
        case productUm
        case productSellingPrice
        case productPurchasePrice
        case productIsActive
        case productIsValid
        case _brand = "brand"
        case _categories = "categories"
        case _attributes = "attributes"
        case _articles = "articles"
        case _discount = "discount"
        case productUpdated = "updatedAt"
    }

    open override func table() -> String { return "products" }
    open override func tableIndexes() -> [String] { return ["productCode", "productName"] }

    open override func to(_ this: StORMRow) {
        productId = this.data["productid"] as? Int ?? 0
        brandId = this.data["brandid"] as? Int ?? 0
        productCode = this.data["productcode"] as? String ?? ""
        productName = this.data["productname"] as? String ?? ""
        productUm = this.data["productum"] as? String ?? ""
        productSellingPrice = Double(this.data["productsellingprice"] as? Float ?? 0)
        productPurchasePrice = Double(this.data["productpurchaseprice"] as? Float ?? 0)
        productIsActive = this.data["productisactive"] as? Bool ?? false
        productIsValid = this.data["productisvalid"] as? Bool ?? false
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
