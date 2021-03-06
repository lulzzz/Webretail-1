//
//  MovementRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM

enum ActionType {
    case Booking
    case Unbooking
    case Delivering
    case Stoking
}

struct MovementRepository : MovementProtocol {

    func getPayments() -> [Item] {
        var items = [Item]()
        items.append(Item(id: "None", value: "None"))
        items.append(Item(id: "Cash", value: "Cash"))
        items.append(Item(id: "PayPal", value: "PayPal - Credit card"))
        items.append(Item(id: "BankTransfer", value: "Bank transfer"))
        items.append(Item(id: "CashOnDelivery", value: "Cash on delivery"))
        return items
    }

    func getShippings() -> [Item] {
        var status = [Item]()
        status.append(Item(id: "None", value: "None"))
        status.append(Item(id: "Standard", value: "Standard"))
        status.append(Item(id: "Express", value: "Express"))
        return status
    }

    func getStatus() -> [ItemValue] {
        var status = [ItemValue]()
        status.append(ItemValue(value: "New"))
        status.append(ItemValue(value: "Processing"))
        status.append(ItemValue(value: "Canceled"))
        status.append(ItemValue(value: "Completed"))
        return status
    }
    
    func getAll() throws -> [Movement] {
        let items = Movement()
        try items.query(cursor: StORMCursor.init(limit: 1000, offset: 0))
        
        return try items.rows()
    }
    
    func getAll(device: String, user: String, date: Int) throws -> [Movement] {
        let items = Movement()
        try items.query(
            whereclause: "movementDevice = $1 AND movementUser = $2 AND movementUpdated > $3",
            params: [device, user, date]
        )
        let rows = try items.rows()
        for row in rows {
            let item = MovementArticle()
            try item.query(
                whereclause: "movementId = $1",
                params: [row.movementId],
                orderby: ["movementArticleId"]
            )
            row._items = item.rows()
        }
        return rows
    }
    
    func getSales(period: Period) throws -> [MovementArticle] {
        let items = MovementArticle()
        let join = StORMDataSourceJoin(
            table: "movements",
            onCondition: "movementarticles.movementId = movements.movementId",
            direction: StORMJoinType.INNER
        )
        try items.query(whereclause: "movements.movementDate >= $1 AND movements.movementDate <= $2 AND (movements.invoiceId > $3 OR movements.movementCausal ->> 'causalIsPos' = $4)",
                        params: [period.start, period.finish, 0, true],
                        orderby: ["movementarticles.movementarticleId"],
                        joins: [join]
        )
        
        return items.rows()
    }
    
    func getReceipted(period: Period) throws -> [Movement] {
        let items = Movement()
        try items.query(whereclause: "movementDate >= $1 AND movementDate <= $2 AND movementCausal ->> 'causalIsPos' = $3",
                        params: [period.start, period.finish, true],
                        orderby: ["movementDevice, movementDate, movementNumber"])
        
        return try items.rows()
    }
    
    func get(id: Int) throws -> Movement? {
        let item = Movement()
        try item.query(id: id)
        
        return item
    }
    
    func get(registryId: Int) throws -> [Movement] {
        let items = Movement()
        try items.query(whereclause: "movementRegistry ->> 'registryId' = $1 AND invoiceId = $2 AND movementStatus = $3",
                        params: [registryId, 0, "Completed"],
                        orderby: ["movementId"])
        
        return try items.rows()
    }
    
    func add(item: Movement) throws {
        if item.movementNumber == 0 {
            try item.newNumber()
        }
        item.movementUpdated = Int.now()
        
        if !item.movementRegistry.registryName.isEmpty {
            let registry = item.movementRegistry
            if registry.registryId <= 0 {
                registry.registryId = 0
                registry.registryCreated = registry.registryUpdated
                try registry.save {
                    id in registry.registryId = id as! Int
                }
                item.movementRegistry = registry
            } else if registry.registryUpdated > 0 {
                let current = Registry()
                try current.query(id: registry.registryId)
                if current.registryUpdated < registry.registryUpdated {
                    try registry.save()
                }
            }
        }
        
        try item.save {
            id in item.movementId = id as! Int
        }
    }
    
    func update(id: Int, item: Movement) throws {
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        item.movementUpdated = Int.now()
        if item.movementStatus == "New" {
            current.movementNumber = item.movementNumber
            current.movementDate = item.movementDate
            current.movementDesc = item.movementDesc
            current.movementUser = item.movementUser
            current.movementDevice = item.movementDevice
            current.movementCausal = item.movementCausal
            current.movementStore = item.movementStore
            current.movementRegistry = item.movementRegistry
            current.movementTags = item.movementTags
            current.movementPayment = item.movementPayment
            current.movementShipping = item.movementShipping
            current.movementShippingCost = item.movementShippingCost
            try current.getAmount()
        } else if current.movementStatus == "New" && item.movementStatus == "Processing" {
            try process(movement: current, actionTypes: [.Delivering, .Booking])
            try current.getAmount()
        }
        else if current.movementStatus == "Processing" && item.movementStatus == "Canceled" {
            try process(movement: current, actionTypes: [.Unbooking])
        }
        else if current.movementStatus != "Completed" && item.movementStatus == "Completed" {
            var actions: [ActionType] = [.Stoking]
            if current.movementStatus == "New" {
                actions = [.Delivering, .Stoking]
            }
            else if current.movementStatus == "Processing" {
                actions = [.Unbooking, .Stoking]
            }
            try process(movement: current, actionTypes: actions)
            try current.getAmount()
        }
        current.movementStatus = item.movementStatus
        current.movementNote = item.movementNote
        current.movementUpdated = item.movementUpdated
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Movement()
        item.movementId = id
        try item.delete()
        
        try item.sql("DELETE FROM movementarticles WHERE movementId = $1", params: [String(id)])
    }
    
    fileprivate func makeBarcodesForTags(_ movement: Movement, _ item: MovementArticle, _ article: Article, _ company: Company) throws {
        
        if movement.movementTags.count == 0 { return }
            
        let price = Price()
        if movement.movementCausal.causalQuantity < 0 {
            price.selling = item.movementArticlePrice
            if price.purchase == 0 {
                price.purchase = item.movementArticleProduct.productPrice.purchase
            }
        } else {
            price.purchase = item.movementArticlePrice
            if price.selling == 0 {
                price.selling = item.movementArticleProduct.productPrice.selling
            }
        }
        
        if let barcode = article.articleBarcodes
                                .first(where: { $0.tags.containsSameElements(as: movement.movementTags) }) {
            item.movementArticleBarcode = barcode.barcode;
            barcode.price = price
            barcode.discount = item.movementArticleProduct.productDiscount
        } else {
            let barcode = Barcode()
            barcode.tags = movement.movementTags
            barcode.price = price
            barcode.discount = item.movementArticleProduct.productDiscount
            
            if barcode.tags.first(where: { $0.valueName == "Amazon" }) != nil {
                company.barcodeCounterPublic += 1
                barcode.barcode = String(company.barcodeCounterPublic).checkdigit()
                
                try Product().update(data: [("productAmazonUpdated", 1)], idName:"productId", idValue: article.productId)
           } else {
                company.barcodeCounterPrivate += 1
                barcode.barcode = String(company.barcodeCounterPrivate).checkdigit()
            }
            article.articleBarcodes.append(barcode)
            item.movementArticleBarcode = barcode.barcode;
        }
        
        article.articleIsValid = true;
        //article.productId = item.movementArticleProduct.productId
        article.articleUpdated = Int.now()
        try article.save()
        
        try item.update(data: [("movementArticleBarcode", item.movementArticleBarcode)], idName:"movementArticleId", idValue: item.movementArticleId)
   }
    
    func process(movement: Movement, actionTypes: [ActionType]) throws {
        
        let article = MovementArticle()
        try article.query(whereclause: "movementId = $1", params: [movement.movementId])

        let storeId = movement.movementStore.storeId
        let quantity = movement.movementCausal.causalQuantity
        let booked = movement.movementCausal.causalBooked
        let company = try (ioCContainer.resolve() as CompanyProtocol).get()!
        
        let articles = article.rows()
        for actionType in actionTypes {
            for item in articles {
            
                if actionType == .Delivering {
                    item.movementArticleDelivered = item.movementArticleQuantity
                    try item.update(data: [("movementArticleDelivered", item.movementArticleQuantity)], idName:"movementArticleId", idValue: item.movementArticleId)
                    continue
                }
                
                let article = item.movementArticleProduct._articles.first!
                let articleId = article.articleId
                let stock = Stock()
                try stock.query(
                    whereclause: "articleId = $1 AND storeId = $2",
                    params: [ articleId, storeId ],
                    cursor: StORMCursor(limit: 1, offset: 0))
                
                if (stock.stockId == 0) {
                    stock.storeId = storeId
                    stock.articleId = articleId
                    try stock.save {
                        id in stock.stockId = id as! Int
                    }
                }
                
                switch actionType {
                case .Booking:
                    if booked > 0 {
                        stock.stockBooked += item.movementArticleQuantity
                    }
                case .Unbooking:
                    if booked > 0 {
                        stock.stockBooked -= item.movementArticleQuantity
                    }
                default:
                    if quantity > 0 {
                        stock.stockQuantity += item.movementArticleDelivered
                    } else if quantity < 0 {
                        stock.stockQuantity -= item.movementArticleDelivered
                    }
                    
                    try makeBarcodesForTags(movement, item, article, company)
                }
                
                try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
            }
        }
        
        try company.save()
    }
    
    func clone(sourceId: Int) throws -> Movement {
        let item = try self.get(id: sourceId)!
        item.movementId = 0
        item.movementNumber = 0
        item.movementDate = Int.now()
        item.movementStatus = "New"
        try self.add(item: item)
        return item
    }
}
