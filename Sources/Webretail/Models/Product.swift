//
//  Product.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class Product: PostgresSqlORM, Codable {
    
    public var productId : Int = 0
    public var brandId : Int = 0
    public var productCode : String = ""
    public var productName : String = ""
    public var productUm : String = ""
    public var productSellingPrice : Double = 0
    public var productPurchasePrice : Double = 0
    public var productMedias: [Media] = [Media]()
    public var productTranslates: [Translation] = [Translation]()
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
        case productMedias = "medias"
        case productTranslates = "translations"
        case productIsActive
        case brandId
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
        
        let decoder = JSONDecoder()
        var jsonData: Data
        if let medias = this.data["productmedias"] {
            jsonData = try! JSONSerialization.data(withJSONObject: medias, options: [])
            productMedias = try! decoder.decode([Media].self, from: jsonData)
        }
        if let translates = this.data["producttranslates"] {
            jsonData = try! JSONSerialization.data(withJSONObject: translates, options: [])
            productTranslates = try! decoder.decode([Translation].self, from: jsonData)
        }
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
        productMedias = try container.decodeIfPresent([Media].self, forKey: .productMedias) ?? [Media]()
        productTranslates = try container.decodeIfPresent([Translation].self, forKey: .productTranslates) ?? [Translation]()
        productIsActive = try container.decode(Bool.self, forKey: .productIsActive)
        _brand = try container.decodeIfPresent(Brand.self, forKey: ._brand) ?? Brand()
        brandId = try container.decodeIfPresent(Int.self, forKey: .brandId) ?? _brand.brandId

        _categories = try container.decodeIfPresent([ProductCategory].self, forKey: ._categories) ?? [ProductCategory]()
        _attributes = try container.decodeIfPresent([ProductAttribute].self, forKey: ._attributes) ?? [ProductAttribute]()
        _articles = try container.decodeIfPresent([Article].self, forKey: ._articles) ?? [Article]()
        _discount = try container.decodeIfPresent(Discount.self, forKey: ._discount) ?? nil
   }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(productId, forKey: .productId)
        try container.encode(productCode, forKey: .productCode)
        try container.encode(productName, forKey: .productName)
        try container.encode(productUm, forKey: .productUm)
        try container.encode(productSellingPrice, forKey: .productSellingPrice)
        try container.encode(productPurchasePrice, forKey: .productPurchasePrice)
        try container.encode(productMedias, forKey: .productMedias)
        try container.encode(productTranslates, forKey: .productTranslates)
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
        article.to(self.results.rows[0])
        let attributeValue = ArticleAttributeValue()
        attributeValue.results = self.results
        article._attributeValues = try attributeValue.rows()
        self._articles = [article]
	}

    func get(barcode: String) throws {
        let brandJoin = StORMDataSourceJoin(
            table: "brands",
            onCondition: "products.brandId = brands.brandId",
            direction: StORMJoinType.INNER
        )
        let articleJoin = StORMDataSourceJoin(
            table: "articles",
            onCondition: "products.productId = articles.productId",
            direction: StORMJoinType.INNER
        )
        let articleAttributeJoin = StORMDataSourceJoin(
            table: "articleattributevalues",
            onCondition: "articleattributevalues.articleId = articles.articleId",
            direction: StORMJoinType.INNER
        )

        let param = """
        [{"barcode": "\(barcode)"}]
        """
        try query(whereclause: "articles.articleBarcodes @> $1::jsonb",
                  params: [param],
                  orderby: ["articleattributevalues.articleAttributeValueId"],
                  joins: [brandJoin, articleJoin, articleAttributeJoin])
        self.to(self.results.rows[0])
        if self.productId == 0 {
            return
        }
        
        try self.makeDiscount()
        try self.makeCategories()
        try self.makeAttributes()
        try self.makeArticle(barcode: barcode)
    }
}
