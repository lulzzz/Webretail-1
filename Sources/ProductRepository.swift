//
//  ProductRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct ProductRepository : ProductProtocol {

	internal func getJoin() -> StORMDataSourceJoin {
		return StORMDataSourceJoin(
			table: "brands",
			onCondition: "products.brandId = brands.brandId",
			direction: StORMJoinType.INNER
		)
	}
		
	func getAll(date: Int) throws -> [Product] {
        let items = Product()
		try items.query(
			whereclause: "productUpdated > $1", params: [date],
			orderby: ["products.productId"],
			joins: [self.getJoin()]
		)

        return try items.rows(barcodes: date > 0)
    }
	
    func getProduct(id: Int) throws -> Product? {
        let item = Product()
		try item.query(
			whereclause: "products.productId = $1",
			params: [String(id)],
			joins: [self.getJoin()]
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

    func add(item: Product) throws {
        item.productCreated = Int.now()
        item.productUpdated = Int.now()
        try item.save {
            id in item.productId = id as! Int
        }
    }
    
    func update(id: Int, item: Product) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
		
        item.productUpdated = Int.now()
        current.productCode = item.productCode
        current.productName = item.productName
        current.productUm = item.productUm
        current.productSellingPrice = item.productSellingPrice
        current.productPurchasePrice = item.productPurchasePrice
        current.productIsActive = item.productIsActive
        current.brandId = item.brandId
		current.productUpdated = item.productUpdated
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
		try item.query(whereclause: "productId = $1 AND categoryId = $2",
		               params: [item.productId, item.categoryId],
		               cursor: StORMCursor(limit: 1, offset: 0))
		try item.delete()
   }
	
	func removeCategories(productId: Int) throws {
		let productCategory = ProductCategory()
		try productCategory.query(whereclause: "productId = $1",
								  params: [productId],
								  cursor: StORMCursor(limit: 1, offset: 0))
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
		try item.query(whereclause: "productId = $1 AND attributeId = $2",
		               params: [item.productId, item.attributeId],
		               cursor: StORMCursor(limit: 1, offset: 0))
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
		try item.query(whereclause: "productAttributeId = $1 AND attributeValueId = $2",
		               params: [item.productAttributeId, item.attributeValueId],
		               cursor: StORMCursor(limit: 1, offset: 0))
        try item.delete()
        try setValid(productAttributeId: item.productAttributeId, valid: false)
    }
    
    internal func setValid(productId: Int, valid: Bool) throws {
        let product = try get(id: productId)!
        if product.productIsValid != valid {
            product.productIsValid = valid
            try update(id: productId, item: product)
        }
    }
    
    internal func setValid(productAttributeId: Int, valid: Bool) throws {
        let productAttribute = ProductAttribute()
        try productAttribute.get(productAttributeId)
        try setValid(productId: productAttribute.productId, valid: valid)
    }
}
