//
//  ProductRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ProductRepository : ProductProtocol {
    
    init() {
        try?  Product().setup()
        try? ProductCategory().setup()
        try? ProductAttribute().setup()
        try? ProductAttributeValue().setup()
    }
    
    func getAll() throws -> [Product] {
        let product = Product()
        try product.findAll()

        return try product.rows()
    }
    
    func get(id: Int) throws -> Product? {
        let item = Product()
        try item.get(id)
        if item.productId == 0 {
            return nil
        }
        
        // get brand
        let brand = Brand()
        try brand.get(item.brandId)
        item._brand = brand
        
        // get categories
        let productCategory = ProductCategory()
        try productCategory.select(
            whereclause: "productId = $1",
            params: [id],
            orderby: ["categoryId"]
        )
        item._categories = try productCategory.rows()
        
        // get attributes
        let productAttribute = ProductAttribute()
        try productAttribute.select(
            whereclause: "productId = $1",
            params: [id],
            orderby: ["productAttributeId"]
        )
        item._attributes = try productAttribute.rows()
        
        // get articles
        let article = Article()
        try article.select(
            whereclause: "productId = $1",
            params: [id],
            orderby: ["articleId"]
        )
        item._articles = try article.rows()

        return item
    }
    
    func get(barcode: String) throws -> Product? {
        let article = Article()
        try article.find([("barcode", barcode)])
        if article.articleId == 0 {
            return nil
        }
       
        // get product
        let item = Product()
        try item.get(article.productId)
        item._articles = try article.rows()
       
        // get brand
        let brand = Brand()
        try brand.get(item.brandId)
        item._brand = brand
        
        // get categories
        let productCategory = ProductCategory()
        try productCategory.select(
            whereclause: "productId = $1",
            params: [article.productId],
            orderby: ["categoryId"]
        )
        item._categories = try productCategory.rows()
        
        // get attributes
        let productAttribute = ProductAttribute()
        try productAttribute.select(
            whereclause: "productId = $1",
            params: [article.productId],
            orderby: ["productAttributeId"]
        )
        item._attributes = try productAttribute.rows()
        
        return item
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
        try item.find([
            ("productId", item.productId),
            ("categoryId", item.categoryId)
        ])
        try item.delete()
    }
    
    func addAttribute(item: ProductAttribute) throws {
        try item.save {
            id in item.productAttributeId = id as! Int
        }
        try setValid(productId: item.productId, valid: false)
    }
    
    func removeAttribute(item: ProductAttribute) throws {
        try item.find([
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
        try item.find([
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
