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
    
    func getProductsDiscount() throws -> [Product] {
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
            whereclause: "products.productIsActive = $1 AND products.productDiscount <> NULL AND (products.productDiscount ->> 'discountId')::int > 0 AND (products.productDiscount ->> 'discountStartAt')::int <= $2 AND (products.productDiscount ->> 'discountFinishAt')::int >= $2 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2",
            params: [true, Int.now()],
            orderby: ["publications.publicationStartAt DESC"],
            joins: [publication, brand]
        )
        
        return try items.rows(barcodes: false)
    }

    func getProducts(brand: String) throws -> [Product] {
        let items = Product()
        try items.query(
            whereclause: "brands.brandSeo ->> 'permalink' = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: [brand, Int.now(), true],
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
            whereclause: "categories.categorySeo ->> 'permalink' = $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: [category, Int.now(), true],
            orderby: ["products.productName"],
            joins:  [publication, brand, productCategories, categories]
        )
        
        return try items.rows(barcodes: false)
    }

    func findProducts(text: String) throws -> [Product] {
        let items = Product()
        try items.query(
            whereclause: "LOWER(products.productName) LIKE $1 AND publications.publicationStartAt <= $2 AND publications.publicationFinishAt >= $2 AND products.productIsActive = $3",
            params: ["%\(text.lowercased())%", Int.now(), true],
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

    func getProduct(name: String) throws -> Product {
        let item = Product()
        try item.query(
            whereclause: "products.productSeo ->> 'permalink' = $1",
            params: [name],
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
        let items = try getBasket(registryId: item.registryId)
        let basket = items.first(where: { $0.basketBarcode == item.basketBarcode})
        if let current = basket {
            current.basketQuantity += 1
            current.basketUpdated = Int.now()
            try current.save()
            item.basketId = current.basketId
            item.basketQuantity = current.basketQuantity
            return
        }
        
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
        var items = [Item]()
        items.append(Item(id: "PayPal", value: "PayPal - Credit card"))
        items.append(Item(id: "BankTransfer", value: "Bank transfer"))
        items.append(Item(id: "CashOnDelivery", value: "Cash on delivery"))
        return items
    }

    func getShippings() -> [Item] {
        var items = [Item]()
        items.append(Item(id: "standard", value: "Standard"))
        items.append(Item(id: "express", value: "Express"))
        return items
    }

    func getShippingCost(id: String, registry: Registry) -> Cost {
        var cost = Cost(value: 0)

        var string: String
        
        let data = FileManager.default.contents(atPath: "./Upload/shippingcost_\(id).csv")
        if let content = data {
            string = String(data: content, encoding: .utf8)!
        } else {
            let defaultData = FileManager.default.contents(atPath: "./Upload/shippingcost.csv")
            if let defaultContent = defaultData {
                string = String(data: defaultContent, encoding: .utf8)!
            } else {
                return cost
            }
        }

        let lines = string.split(separator: "\n")
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

    func addOrder(registryId: Int, order: OrderModel) throws -> Movement {
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
        
        let movement = Movement()
        movement.movementDate = Int.now()
        movement.movementStore = store
        movement.movementCausal = causal
        movement.movementRegistry = registry
        movement.movementUser = "eCommerce"
        movement.movementStatus = "New"
        movement.movementPayment = order.payment
        movement.movementShipping = order.shipping
        movement.movementShippingCost = order.shippingCost
        movement.movementNote = order.paypal.isEmpty ? "" : "paypal authorization: \(order.paypal)"
        movement.movementDesc = "eCommerce order"
        
        try repository.add(item: movement)
        
        for item in items {
            let movementArticle = MovementArticle()
            movementArticle.movementId = movement.movementId
            movementArticle.movementArticleBarcode = item.basketBarcode
            movementArticle.movementArticleProduct = item.basketProduct
            movementArticle.movementArticlePrice = item.basketPrice
            movementArticle.movementArticleQuantity = item.basketQuantity
            movementArticle.movementArticleUpdated = Int.now()
            try movementArticle.save {
                id in movementArticle.movementArticleId = id as! Int
            }
            try item.delete()
        }
        
        movement.movementStatus = "Processing"
        try repository.update(id: movement.movementId, item: movement)
        
        return movement;
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

