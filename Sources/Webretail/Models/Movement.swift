
//
//  Movement.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 28/02/17.
//
//

import Foundation
import StORM

struct ItemValue: Codable {
    public var value: String
}

class Movement: PostgresSqlORM, Codable {
    
    public var movementId : Int = 0
    public var invoiceId : Int = 0
    public var movementNumber : Int = 0
    public var movementDate : Int = Int.now()
    public var movementDesc : String = ""
    public var movementNote : String = ""
    public var movementStatus : String = ""
    public var movementUser : String = ""
    public var movementDevice : String = ""
    public var movementStore : Store = Store()
    public var movementCausal : Causal = Causal()
    public var movementCustomer : Customer = Customer()
    public var movementTags : [Tag] = [Tag]()
    public var movementPayment : String = ""
    public var movementUpdated : Int = Int.now()
    
    public var _movementDate: String {
        return movementDate.formatDateShort()
    }

    public var _amount : Double = 0
    public var _items : [MovementArticle] = [MovementArticle]()
    
    private enum CodingKeys: String, CodingKey {
        case movementId
        case movementNumber
        case movementDate
        case movementDesc
        case movementNote
        case movementStatus
        case movementUser
        case movementDevice
        case movementStore
        case movementCausal
        case movementCustomer
        case movementPayment
        case movementTags
        case _amount = "movementAmount"
        case _items = "movementItems"
        case movementUpdated = "updatedAt"
    }
    
    open override func table() -> String { return "movements" }
    
    open override func to(_ this: StORMRow) {
        movementId = this.data["movementid"] as? Int ?? 0
        movementNumber = this.data["movementnumber"] as? Int ?? 0
        movementDate = this.data["movementdate"] as? Int ?? 0
        movementDesc = this.data["movementdesc"] as? String  ?? ""
        movementNote = this.data["movementnote"] as? String  ?? ""
        movementStatus = this.data["movementstatus"] as? String ?? ""
        movementUser = this.data["movementuser"] as? String  ?? ""
        movementDevice = this.data["movementdevice"] as? String  ?? ""
        let decoder = JSONDecoder()
        var jsonData = try! JSONSerialization.data(withJSONObject: this.data["movementstore"]!, options: [])
        movementStore = try! decoder.decode(Store.self, from: jsonData)
        jsonData = try! JSONSerialization.data(withJSONObject: this.data["movementcausal"]!, options: [])
        movementCausal = try! decoder.decode(Causal.self, from: jsonData)
        if let json = this.data["movementcustomer"] as? [String:Any] {
            if json.count > 0 {
                jsonData = try! JSONSerialization.data(withJSONObject: json, options: [])
                movementCustomer = try! decoder.decode(Customer.self, from: jsonData)
            }
        }
        if let json = this.data["movementtags"] as? [[String:Any]] {
            if json.count > 0 {
                jsonData = try! JSONSerialization.data(withJSONObject: json, options: [])
                movementTags = try! decoder.decode([Tag].self, from: jsonData)
            }
        }
        movementPayment = this.data["movementpayment"] as? String ?? ""
        movementUpdated = this.data["movementupdated"] as? Int ?? 0
    }
    
    func rows() throws -> [Movement] {
        var rows = [Movement]()
        for i in 0..<self.results.rows.count {
            let row = Movement()
            row.to(self.results.rows[i])
            
            let sql = "SELECT SUM(movementArticleQuantity * movementArticlePrice) AS amount FROM movementArticles WHERE movementId = $1";
            let getCount = try self.sqlRows(sql, params: [String(row.movementId)])
            row._amount = Double(getCount.first?.data["amount"] as? Float ?? 0)
            
            rows.append(row)
        }
        return rows
    }
    
    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        movementId = try container.decodeIfPresent(Int.self, forKey: .movementId) ?? 0
        movementNumber = try container.decode(Int.self, forKey: .movementNumber)
        movementDate = try container.decode(String.self, forKey: .movementDate).DateToInt()
        movementDesc = try container.decodeIfPresent(String.self, forKey: .movementDesc) ?? ""
        movementNote = try container.decode(String.self, forKey: .movementNote)
        movementStatus = try container.decode(String.self, forKey: .movementStatus)
        movementUser = try container.decode(String.self, forKey: .movementUser)
        movementDevice = try container.decode(String.self, forKey: .movementDevice)
        movementStore = try container.decode(Store.self, forKey: .movementStore)
        movementCausal = try container.decode(Causal.self, forKey: .movementCausal)
        movementCustomer = try container.decodeIfPresent(Customer.self, forKey: .movementCustomer) ?? Customer()
        movementTags = try container.decodeIfPresent([Tag].self, forKey: .movementTags) ?? [Tag]()
        movementPayment = try container.decode(String.self, forKey: .movementPayment)
        _amount = try container.decode(Double.self, forKey: ._amount)
        _items = try container.decodeIfPresent([MovementArticle].self, forKey: ._items) ?? [MovementArticle]()
    }
    
    func encode(to encoder: Encoder) throws {
        
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(movementId, forKey: .movementId)
        try container.encode(movementNumber, forKey: .movementNumber)
        try container.encode(_movementDate, forKey: .movementDate)
        try container.encode(movementDesc, forKey: .movementDesc)
        try container.encode(movementNote, forKey: .movementNote)
        try container.encode(movementStatus, forKey: .movementStatus)
        try container.encode(movementUser, forKey: .movementUser)
        try container.encode(movementDevice, forKey: .movementDevice)
        try container.encode(movementStore, forKey: .movementStore)
        try container.encode(movementCausal, forKey: .movementCausal)
        try container.encode(movementCustomer, forKey: .movementCustomer)
        try container.encode(movementTags, forKey: .movementTags)
        try container.encode(movementPayment, forKey: .movementPayment)
        try container.encode(_amount, forKey: ._amount)
        try container.encode(_items, forKey: ._items)
        try container.encode(movementUpdated, forKey: .movementUpdated)
    }
    
    func newNumber() throws {
        self.movementNumber = 1000
        var params = [String]()
        var sql = "SELECT MAX(movementNumber) AS counter FROM \(table())";
        if self.movementCausal.causalIsPos {
            self.movementNumber = 1
            sql += " WHERE movementDevice = $1 AND to_char(to_timestamp(movementDate + extract(epoch from timestamp '2001-01-01 00:00:00')), 'YYYY-MM-DD') = $2";
            params.append(movementDevice)
            params.append(movementDate.formatDate(format: "yyyy-MM-dd"))
        }
        let getCount = try self.sqlRows(sql, params: params)
        self.movementNumber += getCount.first?.data["counter"] as? Int ?? 0
    }
}
