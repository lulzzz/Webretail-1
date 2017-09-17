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

    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()

        let container = try decoder.container(keyedBy: CodingKeys.self)
        productId = try container.decode(Int.self, forKey: .productId)
        productCode = try container.decode(String.self, forKey: .productCode)
        productName = try container.decode(String.self, forKey: .productName)
        productUm = try container.decode(String.self, forKey: .productUm)
        productSellingPrice = try container.decode(Double.self, forKey: .productSellingPrice)
        productPurchasePrice = try container.decode(Double.self, forKey: .productPurchasePrice)
        productIsActive = try container.decode(Bool.self, forKey: .productIsActive)
        _brand = try container.decode(Brand.self, forKey: ._brand)
        brandId = _brand.brandId
}
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(productId, forKey: .productId)
        try container.encode(productCode, forKey: .productCode)
        try container.encode(productName, forKey: .productName)
        try container.encode(productUm, forKey: .productUm)
        try container.encode(productSellingPrice, forKey: .productSellingPrice)
        try container.encode(productPurchasePrice, forKey: .productPurchasePrice)
        try container.encode(productIsActive, forKey: .productIsActive)
        try container.encode(_brand, forKey: ._brand)
        try container.encode(_categories, forKey: ._categories)
        try container.encode(_attributes, forKey: ._attributes)
        try container.encode(_articles, forKey: ._articles)
        try container.encodeIfPresent(_discount, forKey: ._discount)
        try container.encode(productUpdated, forKey: .productUpdated)
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
