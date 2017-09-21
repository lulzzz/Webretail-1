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
    case Stoking
}

struct MovementRepository : MovementProtocol {
    
    func getPayments() -> [ItemValue] {
        var status = [ItemValue]()
        status.append(ItemValue(value: "None"))
        status.append(ItemValue(value: "Cash"))
        status.append(ItemValue(value: "Credit card"))
        status.append(ItemValue(value: "Bank transfer"))
        status.append(ItemValue(value: "Carrier"))
        return status
    }
    
    func getStatus() -> [ItemValue] {
        var status = [ItemValue]()
        status.append(ItemValue(value: "New"))
        status.append(ItemValue(value: "Processing"))
        status.append(ItemValue(value: "Suspended"))
        status.append(ItemValue(value: "Canceled"))
        status.append(ItemValue(value: "Completed"))
        return status
    }
    
    func getAll() throws -> [Movement] {
        let items = Movement()
        try items.query(cursor: StORMCursor.init(limit: 10000, offset: 0))
        
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
    
    func get(customerId: Int) throws -> [Movement] {
        let items = Movement()
        try items.query(whereclause: "movementCustomer ->> 'customerId' = $1 AND invoiceId = $2 AND movementStatus = $3",
                        params: [customerId, 0, "Completed"],
                        orderby: ["movementId"])
        
        return try items.rows()
    }
    
    func add(item: Movement) throws {
        if item.movementNumber == 0 {
            try item.newNumber()
        }
        item.movementUpdated = Int.now()
        
        if !item.movementCustomer.customerName.isEmpty {
            let customer = item.movementCustomer
            if customer.customerId <= 0 {
                customer.customerId = 0
                customer.customerCreated = customer.customerUpdated
                try customer.save {
                    id in customer.customerId = id as! Int
                }
                item.movementCustomer = customer
            } else if customer.customerUpdated > 0 {
                let current = Customer()
                try current.query(id: customer.customerId)
                if current.customerUpdated < customer.customerUpdated {
                    try customer.save()
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
            current.movementCustomer = item.movementCustomer
        }
        else if current.movementStatus == "New" && item.movementStatus == "Processing" {
            try process(movement: current, actionType: ActionType.Booking)
        }
        else if current.movementStatus != "Completed" && item.movementStatus == "Completed" {
            try process(movement: current, actionType: ActionType.Stoking)
        }
        else if current.movementStatus == "Processing" && item.movementStatus != "Processing" {
            try process(movement: current, actionType: ActionType.Unbooking)
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
    
    func process(movement: Movement, actionType: ActionType) throws {
        
        let storeId = movement.movementStore.storeId
        let quantity = movement.movementCausal.causalQuantity
        let booked = movement.movementCausal.causalBooked
        
        let article = MovementArticle()
        try article.query(whereclause: "movementId = $1",
                          params: [movement.movementId],
                          cursor: StORMCursor(limit: 1000, offset: 0))
        for item in article.rows() {
            
            let articles = item.movementArticleProduct._articles;
            let articleId = articles[0].articleId
            
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
            case ActionType.Booking:
                if booked > 0 {
                    stock.stockBooked += item.movementArticleQuantity
                }
            case ActionType.Unbooking:
                if booked > 0 {
                    stock.stockBooked -= item.movementArticleQuantity
                }
            default:
                if quantity > 0 {
                    stock.stockQuantity += item.movementArticleQuantity
                } else if quantity < 0 {
                    stock.stockQuantity -= item.movementArticleQuantity
                }
            }
            try stock.update(data: stock.asData(), idName: "stockId", idValue: stock.stockId)
        }
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
