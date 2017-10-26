//
//  ProductRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM
import PerfectLogger

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
    
    func create(item: Product) throws -> [String : Any] {

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
                category.categoryTranslates = c._category.categoryTranslates
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
                attribute.attributeTranslates = a._attribute.attributeTranslates
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
                    attributeValue.attributeValueTranslates = v._attributeValue.attributeValueTranslates
                    attributeValue.attributeValueCreated = Int.now()
                    attributeValue.attributeValueUpdated = Int.now()
                    try attributeValue.save {
                        id in v.attributeValueId = id as! Int
                    }
                } else {
                    v.attributeValueId = attributeValue.attributeValueId
                }
            }
            
            // Medias
            var isDir: ObjCBool = false
            if !FileManager.default.fileExists(atPath: "./webroot/media", isDirectory: &isDir) {
                try FileManager.default.createDirectory(atPath: "./webroot/media", withIntermediateDirectories: true, attributes: nil)
            }
            for m in item.productMedias {
                let url = URL(string: "http://www.tessilnova.com/\(m.url)")
                let data = try? Data(contentsOf: url!)
                if !FileManager.default.createFile(atPath: "./webroot/media/\(m.name)", contents: data, attributes: nil) {
                    throw StORMError.error("File \(m.url) not found")
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
        
        // Build articles
        let result = try (ioCContainer.resolve() as ArticleProtocol).build(productId: item.productId)

        // Sync barcodes
        for a in item._articles {
            var values = a._attributeValues.map({ a in a._attributeValue.attributeValueCode })
            values.append("\(item.productId)")
            values.append("\(item._attributes.count)")
            
            let article = Article()
            let current = try article.sqlRows("""
                SELECT a.*
                FROM articles as a
                LEFT JOIN articleattributevalues as b ON a.articleId = b.articleId
                LEFT JOIN attributevalues as c ON b.attributeValueId = c.attributeValueId
                WHERE c.attributeValueCode IN ($1, $2, $3) AND a.productId = $4
                GROUP BY a.articleId HAVING count(b.attributeValueId) = $5
                """, params: values)
            
             if current.count > 0 {
                article.to(current[0])
                article.articleBarcode = a.articleBarcode
                try article.save()
            }
        }
        
        return result;
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
    
    func get(productId: Int) throws -> Publication? {
        let item = Publication()
        try item.query(
            whereclause: "productId = $1", params: [productId],
            cursor: StORMCursor(limit: 1, offset: 0)
        )
        
        return item
    }

    func publish(id: Int, item: Product) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        for c in item._categories {
            let category = Category()
            try category.query(id: c._category.categoryId)
            category.categoryTranslates = c._category.categoryTranslates
            try category.save()
        }
        
        for a in item._attributes {
            let attribute = Attribute()
            try attribute.query(id: a._attribute.attributeId)
            attribute.attributeTranslates = a._attribute.attributeTranslates
            try attribute.save()
            
            for v in a._attributeValues {
                let attributeValue = AttributeValue()
                try attributeValue.query(id: v._attributeValue.attributeValueId)
                attributeValue.attributeValueTranslates = v._attributeValue.attributeValueTranslates
                try attributeValue.save()
            }
        }
        
        for c in current.productMedias {
            if !item.productMedias.contains(where: { p in p.name == c.name }) {
                if (FileManager.default.fileExists(atPath: "./webroot/\(c.url)")) {
                    try FileManager.default.removeItem(atPath: "./webroot/\(c.url)")
                }
            }
        }
        
        current.productMedias = item.productMedias
        current.productTranslates = item.productTranslates
        current.productUpdated = Int.now()
        
        try current.save()
    }

    func delete(id: Int) throws {
        let item = Product()
        item.productId = id
        try item.delete()

        let productId = String(id)
        try item.sql("DELETE FROM productcategories WHERE productId = $1", params: [productId])
        try item.sql("""
            DELETE FROM productattributevalues
            WHERE productattributeId IN
            (
              SELECT productattributeId
              FROM   productattributes
              WHERE  productId = $1
            )
            """, params: [productId])
        try item.sql("DELETE FROM productattributes WHERE productId = $1", params: [productId])
        try item.sql("""
            DELETE FROM articleattributevalues
            WHERE articleId IN
            (
              SELECT articleId
              FROM   articles
              WHERE  productId = $1
            )
            """, params: [productId])
        try item.sql("""
            DELETE FROM stocks
            WHERE articleId IN
            (
              SELECT articleId
              FROM   articles
              WHERE  productId = $1
            )
            """, params: [productId])
        try item.sql("DELETE FROM articles WHERE productId = $1", params: [productId])
        try item.sql("DELETE FROM discountproducts WHERE productId = $1", params: [productId])
        try item.sql("DELETE FROM publications WHERE productId = $1", params: [productId])
    }

    func addCategory(item: ProductCategory) throws {
        //item.categoryId = item._category.categoryId
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
