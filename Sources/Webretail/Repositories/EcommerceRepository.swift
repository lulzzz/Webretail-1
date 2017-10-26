//
//  EcommerceRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

import StORM

struct EcommerceRepository : EcommerceProtocol {
    
    func getFeatured() throws -> [Product] {
        let publication = StORMDataSourceJoin(
            table: "publications",
            onCondition: "products.productId = publications.productId",
            direction: StORMJoinType.INNER
        )
        let brand = StORMDataSourceJoin(
            table: "brands",
            onCondition: "products.brandId = brands.brandId",
            direction: StORMJoinType.INNER
        )
        
        let items = Product()
        try items.query(
            whereclause: "publications.publicationFeatured = $1 AND products.productIsActive = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2",
            params: [true, Int.now()],
            orderby: ["publications.publicationStartAt DESC"],
            joins: [publication, brand]
        )
        
        return try items.rows(barcodes: false)
    }
    
    func getPublished() throws -> [Product] {
        let publication = StORMDataSourceJoin(
            table: "publications",
            onCondition: "products.productId = publications.productId",
            direction: StORMJoinType.INNER
        )
        let brand = StORMDataSourceJoin(
            table: "brands",
            onCondition: "products.brandId = brands.brandId",
            direction: StORMJoinType.INNER
        )
        let categories = StORMDataSourceJoin(
            table: "productcategories",
            onCondition: "products.productId = productcategories.productId",
            direction: StORMJoinType.LEFT
        )
        
        let items = Product()
        try items.query(
            whereclause: "publications.publicationStartAt <= $1 AND publications.publicationFinishAt >= $1 AND products.productIsActive = $2",
            params: [Int.now(), true],
            orderby: ["products.productName"],
            joins:  [publication, brand, categories]
        )
        
        return try items.rows(barcodes: false)
    }
    
    func getCategories() throws -> [Category] {
        let categories = StORMDataSourceJoin(
            table: "productcategories",
            onCondition: "categories.categoryId = productcategories.categoryId",
            direction: StORMJoinType.INNER
        )
        let product = StORMDataSourceJoin(
            table: "products",
            onCondition: "productcategories.productId = products.productId",
            direction: StORMJoinType.INNER
        )
        let publication = StORMDataSourceJoin(
            table: "publications",
            onCondition: "products.productId = publications.productId",
            direction: StORMJoinType.INNER
        )
        
        let items = Category()
        try items.query(
            columns: ["DISTINCT categories.*"],
            whereclause: "publications.publicationStartAt <= $1 AND publications.publicationFinishAt >= $1 AND categories.categoryIsPrimary = $2 AND products.productIsActive = $2",
            params: [Int.now(), true],
            orderby: ["categories.categoryName"],
            joins:  [categories, product, publication]
        )
        
        return items.rows()
    }
    
    func getPublished(categoryId: Int) throws -> [Product] {
        let publication = StORMDataSourceJoin(
            table: "publications",
            onCondition: "products.productId = publications.productId",
            direction: StORMJoinType.INNER
        )
        let brand = StORMDataSourceJoin(
            table: "brands",
            onCondition: "products.brandId = brands.brandId",
            direction: StORMJoinType.INNER
        )
        let categories = StORMDataSourceJoin(
            table: "productcategories",
            onCondition: "products.productId = productcategories.productId",
            direction: StORMJoinType.LEFT
        )
        
        let items = Product()
        try items.query(
            whereclause: "productcategories.categoryId = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: [categoryId, Int.now(), true],
            orderby: ["products.productName"],
            joins:  [publication, brand, categories]
        )
        
        return try items.rows(barcodes: false)
    }
    
    func getBasket(customerId: Int) throws -> [Basket] {
        let items = Basket()
        try items.query(whereclause: "customerId = $1", params: [customerId])
        
        return items.rows()
    }
    
    func addBasket(item: Basket) throws {
        item.basketUpdated = Int.now()
        try item.save {
            id in item.basketId = id as! Int
        }
    }
    
    func updateBasket(id: Int, item: Basket) throws {
        let current = Basket()
        try current.get(id)
        if current.basketId == 0 {
            throw StORMError.noRecordFound
        }
        current.basketQuantity = item.basketQuantity
        current.basketUpdated = Int.now()
        try current.save()
    }
    
    func deleteBasket(id: Int) throws {
        let item = Basket()
        item.basketId = id
        try item.delete()
    }
    
    func commitBasket(customerId: Int) throws {
        
    }
}
