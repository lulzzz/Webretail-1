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
        item.brandId = item._brand.brandId
        item.productCreated = Int.now()
        item.productUpdated = Int.now()
        try item.save {
            id in item.productId = id as! Int
        }
    }
    
    func create(item: Product) throws {

        // Brand
        let brand = Brand()
        try brand.query(
            whereclause: "brandName = $1", params: [item._brand.brandName],
            cursor: StORMCursor(limit: 1, offset: 0)
        )
        if brand.brandId == 0 {
            brand.brandName = item._brand.brandName
            brand.brandCreated = Int.now()
            brand.brandUpdated = Int.now()
            try brand.save {
                id in item.brandId = id as! Int
            }
        } else {
            item.brandId = brand.brandId
        }
        
        // Categories
        for c in item._categories.sorted(by: { $0._category.categoryIsPrimary.hashValue < $1._category.categoryIsPrimary.hashValue }) {
            let category = Category()
            try category.query(
                whereclause: "categoryName = $1", params: [c._category.categoryName],
                cursor: StORMCursor(limit: 1, offset: 0)
            )
            if category.categoryId == 0 {
                category.categoryName = c._category.categoryName
                category.categoryIsPrimary = c._category.categoryIsPrimary
                category.categoryCreated = Int.now()
                category.categoryUpdated = Int.now()
                try category.save {
                    id in c.categoryId = id as! Int
                }
            } else {
                c.categoryId = category.categoryId
            }
        }
        
        // Attributes
        for a in item._attributes {
            let attribute = Attribute()
            try attribute.query(
                whereclause: "attributeName = $1", params: [a._attribute.attributeName],
                cursor: StORMCursor(limit: 1, offset: 0)
            )
            if attribute.attributeId == 0 {
                attribute.attributeName = a._attribute.attributeName
                attribute.attributeCreated = Int.now()
                attribute.attributeUpdated = Int.now()
                try attribute.save {
                    id in a.attributeId = id as! Int
                }
            } else {
                a.attributeId = attribute.attributeId
            }
            
            // AttributeValues
            for v in a._attributeValues.sorted(by: { $0._attributeValue.attributeValueCode < $1._attributeValue.attributeValueCode }) {
                let attributeValue = AttributeValue()
                try attributeValue.query(
                    whereclause: "attributeId = $1 AND attributeValueName = $2", params: [attribute.attributeId, v._attributeValue.attributeValueName],
                    cursor: StORMCursor(limit: 1, offset: 0)
                )
                if attributeValue.attributeValueId == 0 {
                    attributeValue.attributeId = a.attributeId
                    attributeValue.attributeValueCode = v._attributeValue.attributeValueCode
                    attributeValue.attributeValueName = v._attributeValue.attributeValueName
                    attributeValue.attributeValueCreated = Int.now()
                    attributeValue.attributeValueUpdated = Int.now()
                    try attributeValue.save {
                        id in v.attributeValueId = id as! Int
                    }
                } else {
                    v.attributeValueId = attributeValue.attributeValueId
                }
            }
        }

        item.productCreated = Int.now()
        item.productUpdated = Int.now()
        try item.save {
            id in item.productId = id as! Int
        }
        
        // ProductCategories
        for c in item._categories {
            let productCategory = ProductCategory()
            productCategory.productId = item.productId
            productCategory.categoryId = c.categoryId
            try productCategory.save {
                id in productCategory.productCategoryId = id as! Int
            }
        }

        // ProductAttributes
        for a in item._attributes {
            let productAttribute = ProductAttribute()
            productAttribute.productId = item.productId
            productAttribute.attributeId = a.attributeId
            try productAttribute.save {
                id in a.productAttributeId = id as! Int
            }
            
            // ProductAttributeValues
            for v in a._attributeValues {
                let productAttributeValue = ProductAttributeValue()
                productAttributeValue.productAttributeId = a.productAttributeId
                productAttributeValue.attributeValueId = v.attributeValueId
                try productAttributeValue.save {
                    id in v.productAttributeValueId = id as! Int
                }
            }
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
        current.brandId = item._brand.brandId
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
