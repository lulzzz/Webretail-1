//
//  ProductRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct ProductRepository : ProductProtocol {

	internal func getJoins() -> [StORMDataSourceJoin] {
		var brandJoin = StORMDataSourceJoin()
		brandJoin.table = "brands"
		brandJoin.direction = StORMJoinType.INNER
		brandJoin.onCondition = "products.brandId = brands.brandId"
		return [brandJoin]
	}
		
	func getAll() throws -> [Product] {
        let items = Product()
		try items.query(
			orderby: ["products.productId"],
			joins: self.getJoins()
		)

        return try items.rows()
    }
	
    func getProduct(id: Int) throws -> Product? {
        let item = Product()
		try item.query(
			whereclause: "products.productId = $1",
			params: [String(id)],
			joins: self.getJoins()
		)
		
        if item.productId == 0 {
            return nil
        }
        
		try item.makeDiscount()
		try item.makeCategories()
		try item.makeAttributes()

        return item
    }
    
	func get(id: Int) throws -> Product? {
		let item = try getProduct(id: id)
		try item?.makeArticles()
		
		return item
	}

	func get(barcode: String) throws -> Product? {
        let article = Article()
        try article.query([("barcode", barcode)])
        if article.articleId == 0 {
            return nil
        }
       
        return try getProduct(id: article.productId)
    }

    func add(item: Product) throws {
        item.created = Int.now()
        item.updated = Int.now()
        try item.save {
            id in item.productId = id as! Int
        }
    }
    
    func update(id: Int, item: Product) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.productCode = item.productCode
        current.productName = item.productName
        current.productUm = item.productUm
        current.sellingPrice = item.sellingPrice
        current.purchasePrice = item.purchasePrice
        current.productCode = item.productCode
        current.isActive = item.isActive
        current.brandId = item.brandId
		current.updated = Int.now()
		try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Product()
        item.productId = id
        try item.delete()
    }

    func addCategory(item: ProductCategory) throws {
        try item.save {
            id in item.productCategoryId = id as! Int
        }
    }
    
	func removeCategory(item: ProductCategory) throws {
		try item.query([
			("productId", item.productId),
			("categoryId", item.categoryId)
		])
		try item.delete()
   }
	
	func removeCategories(productId: Int) throws {
		let productCategory = ProductCategory()
		try productCategory.query([("productId", productId)])
		for row in try productCategory.rows() {
			try row.delete()
		}
	}

	func addAttribute(item: ProductAttribute) throws {
        try item.save {
            id in item.productAttributeId = id as! Int
        }
        try setValid(productId: item.productId, valid: false)
    }
    
    func removeAttribute(item: ProductAttribute) throws {
        try item.query([
            ("productId", item.productId),
            ("attributeId", item.attributeId)
        ])
        try item.delete()
        try setValid(productId: item.productId, valid: false)
    }
    
    func addAttributeValue(item: ProductAttributeValue) throws {
        try item.save {
            id in item.productAttributeValueId = id as! Int
        }
        try setValid(productAttributeId: item.productAttributeId, valid: false)
    }
    
    func removeAttributeValue(item: ProductAttributeValue) throws {
        try item.query([
            ("productAttributeId", item.productAttributeId),
            ("attributeValueId", item.attributeValueId)
        ])
        try item.delete()
        try setValid(productAttributeId: item.productAttributeId, valid: false)
    }
    
    internal func setValid(productId: Int, valid: Bool) throws {
        let product = try get(id: productId)!
        if product.isValid != valid {
            product.isValid = valid
            try update(id: productId, item: product)
        }
    }
    
    internal func setValid(productAttributeId: Int, valid: Bool) throws {
        let productAttribute = ProductAttribute()
        try productAttribute.get(productAttributeId)
        try setValid(productId: productAttribute.productId, valid: valid)
    }
}
