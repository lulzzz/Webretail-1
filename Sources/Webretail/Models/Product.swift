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
    public var productType : String = ""
    public var productTax : Tax = Tax()
    public var productUm : String = ""
    public var productPrice : Price = Price()
    public var productDiscount : Discount = Discount()
    public var productPackaging : Packaging = Packaging()
    public var productDescription: [Translation] = [Translation]()
    public var productMedias: [Media] = [Media]()
    public var productSeo : Seo = Seo()
    public var productIsActive : Bool = false
    public var productIsValid : Bool = false
    public var productCreated : Int = Int.now()
    public var productUpdated : Int = Int.now()
    public var productAmazonUpdated : Int = 0

	public var _brand: Brand = Brand()
    public var _categories: [ProductCategory] = [ProductCategory]()
    public var _attributes: [ProductAttribute] = [ProductAttribute]()
    public var _articles: [Article] = [Article]()

    private enum CodingKeys: String, CodingKey {
        case productId
        case brandId
        case productCode
        case productName
        case productType
        case productTax
        case productUm
        case productPrice = "price"
        case productDiscount = "discount"
        case productPackaging = "packaging"
        case productDescription = "translations"
        case productMedias = "medias"
        case productSeo = "seo"
        case productIsActive
        case _brand = "brand"
        case _categories = "categories"
        case _attributes = "attributes"
        case _articles = "articles"
        case productUpdated = "updatedAt"
    }

    open override func table() -> String { return "products" }
    open override func tableIndexes() -> [String] { return ["productCode", "productName"] }

    open override func to(_ this: StORMRow) {
        productId = this.data["productid"] as? Int ?? 0
        brandId = this.data["brandid"] as? Int ?? 0
        productCode = this.data["productcode"] as? String ?? ""
        productName = this.data["productname"] as? String ?? ""
        productType = this.data["producttype"] as? String ?? ""
        productUm = this.data["productum"] as? String ?? ""
        let decoder = JSONDecoder()
        var jsonData: Data
        if let price = this.data["productprice"] {
            jsonData = try! JSONSerialization.data(withJSONObject: price, options: [])
            productPrice = try! decoder.decode(Price.self, from: jsonData)
        }
        if let discount = this.data["productdiscount"] {
            jsonData = try! JSONSerialization.data(withJSONObject: discount, options: [])
            productDiscount = try! decoder.decode(Discount.self, from: jsonData)
        }
        if let packaging = this.data["productpackaging"] {
            jsonData = try! JSONSerialization.data(withJSONObject: packaging, options: [])
            productPackaging = try! decoder.decode(Packaging.self, from: jsonData)
        }
        if let tax = this.data["producttax"] {
            jsonData = try! JSONSerialization.data(withJSONObject: tax, options: [])
            productTax = try! decoder.decode(Tax.self, from: jsonData)
        }
        if let descriptions = this.data["productdescription"] {
            jsonData = try! JSONSerialization.data(withJSONObject: descriptions, options: [])
            productDescription = try! decoder.decode([Translation].self, from: jsonData)
        }
        if let medias = this.data["productmedias"] {
            jsonData = try! JSONSerialization.data(withJSONObject: medias, options: [])
            productMedias = try! decoder.decode([Media].self, from: jsonData)
        }
        if let seo = this.data["productseo"] {
            jsonData = try! JSONSerialization.data(withJSONObject: seo, options: [])
            productSeo = try! decoder.decode(Seo.self, from: jsonData)
        }
        productIsActive = this.data["productisactive"] as? Bool ?? false
        productIsValid = this.data["productisvalid"] as? Bool ?? false
        productCreated = this.data["productcreated"] as? Int ?? 0
        productUpdated = this.data["productupdated"] as? Int ?? 0
        productAmazonUpdated = this.data["productamazonupdated"] as? Int ?? 0
		_brand.to(this)
    }
    
    func rows(barcodes: Bool, storeIds: String = "0") throws -> [Product] {
        var rows = [Product]()
        for i in 0..<self.results.rows.count {
            let row = Product()
            row.to(self.results.rows[i])
			
            try row.makeCategories();
			
			if barcodes {
				try row.makeAttributes();
				try row.makeArticles(storeIds);
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
        productDescription = try container.decodeIfPresent([Translation].self, forKey: .productDescription) ?? [Translation]()
        productType = try container.decode(String.self, forKey: .productType)
        productUm = try container.decode(String.self, forKey: .productUm)
        productTax = try container.decodeIfPresent(Tax.self, forKey: .productTax) ?? Tax()
        productPrice = try container.decodeIfPresent(Price.self, forKey: .productPrice) ?? Price()
        productDiscount = try container.decodeIfPresent(Discount.self, forKey: .productDiscount) ?? Discount()
        productPackaging = try container.decodeIfPresent(Packaging.self, forKey: .productPackaging) ?? Packaging()
        productMedias = try container.decodeIfPresent([Media].self, forKey: .productMedias) ?? [Media]()
        productSeo = try container.decodeIfPresent(Seo.self, forKey: .productSeo) ?? Seo()
        productIsActive = try container.decode(Bool.self, forKey: .productIsActive)
        _brand = try container.decodeIfPresent(Brand.self, forKey: ._brand) ?? Brand()
        brandId = try container.decodeIfPresent(Int.self, forKey: .brandId) ?? _brand.brandId

        _categories = try container.decodeIfPresent([ProductCategory].self, forKey: ._categories) ?? [ProductCategory]()
        _attributes = try container.decodeIfPresent([ProductAttribute].self, forKey: ._attributes) ?? [ProductAttribute]()
        _articles = try container.decodeIfPresent([Article].self, forKey: ._articles) ?? [Article]()
   }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(productId, forKey: .productId)
        try container.encode(productCode, forKey: .productCode)
        try container.encode(productName, forKey: .productName)
        try container.encode(productDescription, forKey: .productDescription)
        try container.encode(productType, forKey: .productType)
        try container.encode(productUm, forKey: .productUm)
        try container.encode(productTax, forKey: .productTax)
        try container.encode(productPrice, forKey: .productPrice)
        try container.encode(productDiscount, forKey: .productDiscount)
        try container.encode(productPackaging, forKey: .productPackaging)
        try container.encode(productMedias, forKey: .productMedias)
        try container.encode(productSeo, forKey: .productSeo)
        try container.encode(productIsActive, forKey: .productIsActive)
        try container.encode(_brand, forKey: ._brand)
        try container.encode(_categories, forKey: ._categories)
        try container.encode(_attributes, forKey: ._attributes)
        try container.encode(_articles, forKey: ._articles)
        try container.encode(productUpdated, forKey: .productUpdated)
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

    func makeArticles(_ storeIds: String = "0") throws {
		let article = Article()
        article._storeIds = storeIds
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
            direction: StORMJoinType.LEFT
        )

        let param = """
        [{"barcode": "\(barcode)"}]
        """
        try query(whereclause: "articles.articleBarcodes @> $1::jsonb",
                  params: [param],
                  orderby: ["articleattributevalues.articleAttributeValueId"],
                  joins: [brandJoin, articleJoin, articleAttributeJoin])
        if self.results.rows.count == 0 {
            return
        }
        self.to(self.results.rows[0])

        try self.makeCategories()
        try self.makeAttributes()
        try self.makeArticle(barcode: barcode)
    }
}
