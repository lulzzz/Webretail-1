//
//  EcommerceRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

import StORM
import Foundation

struct EcommerceRepository : EcommerceProtocol {

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

    func getBrands() throws -> [Brand] {
        let product = StORMDataSourceJoin(
            table: "products",
            onCondition: "brands.brandId = products.brandId",
            direction: StORMJoinType.INNER
        )
        let publication = StORMDataSourceJoin(
            table: "publications",
            onCondition: "products.productId = publications.productId",
            direction: StORMJoinType.INNER
        )
        
        let items = Brand()
        try items.query(
            columns: ["DISTINCT brands.*"],
            whereclause: "publications.publicationStartAt <= $1 AND publications.publicationFinishAt >= $1 AND products.productIsActive = $2",
            params: [Int.now(), true],
            orderby: ["brands.brandName"],
            joins:  [product, publication]
        )
        
        return items.rows()
    }
    
    
    func getProductsFeatured() throws -> [Product] {
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
    
    func getProductsNews() throws -> [Product] {
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
            whereclause: "publications.publicationNew = $1 AND products.productIsActive = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2",
            params: [true, Int.now()],
            orderby: ["publications.publicationStartAt DESC"],
            joins: [publication, brand]
        )
        
        return try items.rows(barcodes: false)
    }
    
    func getProducts(brand: String) throws -> [Product] {
        let items = Product()
        try items.query(
            whereclause: "LOWER(brands.brandName) = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: [self.normalize(name: brand), Int.now(), true],
            orderby: ["products.productName"],
            joins:  [
                StORMDataSourceJoin(
                    table: "publications",
                    onCondition: "products.productId = publications.productId",
                    direction: StORMJoinType.INNER),
                StORMDataSourceJoin(
                    table: "brands",
                    onCondition: "products.brandId = brands.brandId",
                    direction: StORMJoinType.INNER)
            ]
        )
        
        return try items.rows(barcodes: false)
    }
    
    func getProducts(category: String) throws -> [Product] {
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
        let productCategories = StORMDataSourceJoin(
            table: "productcategories",
            onCondition: "products.productId = productcategories.productId",
            direction: StORMJoinType.LEFT
        )
        let categories = StORMDataSourceJoin(
            table: "categories",
            onCondition: "productcategories.categoryId = categories.categoryId",
            direction: StORMJoinType.INNER
        )

        let items = Product()
        try items.query(
            whereclause: "LOWER(categories.categoryName) = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: [self.normalize(name: category), Int.now(), true],
            orderby: ["products.productName"],
            joins:  [publication, brand, productCategories, categories]
        )
        
        return try items.rows(barcodes: false)
    }

    private func normalize(name: String) -> String {
        return name.lowercased()
            .replacingOccurrences(of: "-", with: " ")
            .replacingOccurrences(of: "_", with: "/")
    }
    
    func getProduct(name: String) throws -> Product {
        let item = Product()
        try item.query(
            whereclause: "LOWER(products.productName) = $1",
            params: [self.normalize(name: name)],
            joins: [
                StORMDataSourceJoin(
                    table: "brands",
                    onCondition: "products.brandId = brands.brandId",
                    direction: StORMJoinType.INNER
                )
            ]
        )
        if item.productId == 0 {
            throw StORMError.noRecordFound
        }
        
        try item.makeDiscount()
        try item.makeCategories()
        try item.makeAttributes()
        try item.makeArticles()
        
        return item
    }

    func getBasket(registryId: Int) throws -> [Basket] {
        let items = Basket()
        try items.query(whereclause: "registryId = $1", params: [registryId])
        
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
        try current.query(id: id)
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
    
    func getPayments() -> [Item] {
        var status = [Item]()
        status.append(Item(id: "PayPal", value: "PayPal / Credit card"))
        status.append(Item(id: "BankTransfer", value: "Bank transfer"))
        status.append(Item(id: "CashOnDelivery", value: "Cash on delivery"))
        return status
    }

    func getShippings() -> [Item] {
        var status = [Item]()
        status.append(Item(id: "express", value: "Express"))
        status.append(Item(id: "standard", value: "Standard"))
        return status
    }

    func getShippingCost(id: String, registry: Registry) -> Cost {
        var cost = Cost(value: 0)

        let content: String
        do {
            content = try String(contentsOf: URL(fileURLWithPath: "./Upload/shippingcost_\(id).csv"))
        } catch {
            print("shippingcost_\(id).csv: \(error)")
            content = try! String(contentsOf: URL(fileURLWithPath: "./Upload/shippingcost.csv"))
        }

        let lines = content.split(separator: "\n")
        for line in lines {
            let columns = line.split(separator: ",", omittingEmptySubsequences: false)
            
            if (columns[0] == registry.registryCountry || columns[0] == "*")
            {
                if let value = Double(columns[4]) {
                    cost.value = value
                }
                if (columns[1] == registry.registryCity)
                {
                    if let value = Double(columns[4]) {
                        cost.value = value
                    }
                    return cost;
                }
            }
        }

        return cost
    }

    func addOrder(registryId: Int, payment: String) throws -> Movement {
        let repository = ioCContainer.resolve() as MovementProtocol
        
        let items = try self.getBasket(registryId: registryId)
        if items.count == 0 {
            throw StORMError.noRecordFound
        }

        let registry = Registry()
        try registry.get(registryId)
        if registry.registryId == 0 {
            throw StORMError.noRecordFound
        }
        
        let store = Store()
        try store.query(orderby: ["storeId"],
                        cursor: StORMCursor.init(limit: 1, offset: 0))

        let causal = Causal()
        try causal.query(whereclause: "causalBooked = $1 AND causalQuantity = $2 AND causalIsPos = $3",
                        params: [1, -1 , true],
                        orderby: ["causalId"],
                        cursor: StORMCursor.init(limit: 1, offset: 0))
        if causal.causalId == 0 {
            throw StORMError.error("no causal found")
        }
        
        let order = Movement()
        order.movementDate = Int.now()
        order.movementStore = store
        order.movementCausal = causal
        order.movementRegistry = registry
        order.movementUser = "Registry"
        order.movementStatus = "New"
        order.movementPayment = payment
        order.movementDesc = "eCommerce order"
        
        try repository.add(item: order)
        
        for item in items {
            let orderArticle = MovementArticle()
            orderArticle.movementId = order.movementId
            orderArticle.movementArticleBarcode = item.basketBarcode
            orderArticle.movementArticleProduct = item.basketProduct
            orderArticle.movementArticlePrice = item.basketPrice
            orderArticle.movementArticleQuantity = item.basketQuantity
            orderArticle.movementArticleUpdated = Int.now()
            try orderArticle.save {
                id in orderArticle.movementArticleId = id as! Int
            }
            try item.delete()
        }
        
        order.movementStatus = "Processing"
        try repository.update(id: order.movementId, item: order)
        
        return order;
    }

    func getOrders(registryId: Int) throws -> [Movement] {
        let items = Movement()
        try items.query(whereclause: "movementRegistry ->> 'registryId' = $1",
                        params: [registryId],
                        orderby: ["movementId DESC"])
        
        return try items.rows()
    }

    func getOrder(registryId: Int, id: Int) throws -> Movement {
        let item = Movement()
        try item.query(whereclause: "movementRegistry ->> 'registryId' = $1 AND movementId = $2",
                       params: [registryId, id],
                       cursor: StORMCursor(limit: 1, offset: 0))

        return item
    }
    
    func getOrderItems(registryId: Int, id: Int) throws -> [MovementArticle] {
        let items = MovementArticle()
        let join = StORMDataSourceJoin(
            table: "movements",
            onCondition: "movementarticles.movementId = movements.movementId",
            direction: StORMJoinType.RIGHT
        )
        try items.query(whereclause: "movements.movementRegistry ->> 'registryId' = $1 AND movementarticles.movementId = $2",
                        params: [registryId, id],
                        orderby: ["movementarticles.movementarticleId"],
                        joins: [join]
        )
        
        return items.rows()
    }
}

