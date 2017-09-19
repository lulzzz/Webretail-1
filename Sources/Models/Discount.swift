//
//  Discount.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import StORM

class Discount: PostgresSqlORM, Codable {
	
	public var discountId : Int = 0
	public var discountName : String = ""
	public var discountPercentage : Int = 0
	public var discountPrice : Double = 0
	public var discountStartAt : Int = Int.now()
	public var discountFinishAt : Int = Int.now()
	public var discountUpdated : Int = Int.now()
	
    public var _discountStartAt: String {
        return discountStartAt.formatDateShort()
    }
    
    public var _discountFinishAt: String {
        return discountFinishAt.formatDateShort()
    }

    private enum CodingKeys: String, CodingKey {
        case discountId
        case discountName
        case discountPercentage
        case discountPrice
        case discountStartAt
        case discountFinishAt
        case discountUpdated
    }

    open override func table() -> String { return "discounts" }
	open override func tableIndexes() -> [String] { return ["discountName"] }
	
	open override func to(_ this: StORMRow) {
		discountId = this.data["discountid"] as? Int ?? 0
		discountName = this.data["discountname"] as? String ?? ""
		discountPercentage = this.data["discountpercentage"] as? Int ?? 0
		discountPrice = Double(this.data["discountprice"] as? Float ?? 0)
		discountStartAt = this.data["discountstartat"] as? Int ?? 0
		discountFinishAt = this.data["discountfinishat"] as? Int ?? 0
		discountUpdated = this.data["discountupdated"] as? Int ?? 0
	}
	
	func rows() -> [Discount] {
		var rows = [Discount]()
		for i in 0..<self.results.rows.count {
			let row = Discount()
			row.to(self.results.rows[i])
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
        discountId = try container.decode(Int.self, forKey: .discountId)
        discountName = try container.decode(String.self, forKey: .discountName)
        discountPercentage = try container.decode(Int.self, forKey: .discountPercentage)
        discountPrice = try container.decode(Double.self, forKey: .discountPrice)
        discountStartAt = try container.decode(String.self, forKey: .discountStartAt).DateToInt()
        discountFinishAt = try container.decode(String.self, forKey: .discountStartAt).DateToInt()
        discountUpdated = try container.decode(Int.self, forKey: .discountUpdated)
    }
    
    func encode(to encoder: Encoder) throws {
        
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(discountId, forKey: .discountId)
        try container.encode(discountName, forKey: .discountName)
        try container.encode(discountPercentage, forKey: .discountPercentage)
        try container.encode(discountPrice, forKey: .discountPrice)
        try container.encode(_discountStartAt, forKey: .discountStartAt)
        try container.encode(_discountFinishAt, forKey: .discountFinishAt)
        try container.encode(discountUpdated, forKey: .discountUpdated)
    }
    
    func get(productId: Int) throws {
		var join = StORMDataSourceJoin()
		join.table = "discountproducts"
		join.direction = StORMJoinType.INNER
		join.onCondition = "discounts.discountId = discountproducts.discountId"
		
		try self.query(
			columns: [],
			whereclause: "discountproducts.productId = $1 AND discounts.discountStartAt < $2 AND discounts.discountFinishAt > $2",
			params: [String(productId), String(Int.now())],
			orderby: ["discounts.discountId DESC"],
			cursor: StORMCursor(limit: 1, offset: 0),
			joins: [ join ]
		)

//		var params = [String]()
//		params.append(String(productId))
//		params.append(String(Int.now()))
//		let sql = "SELECT a.* " +
//			"FROM discounts AS a " +
//			"INNER JOIN discountproducts AS b ON a.discountId = b.discountId " +
//			"WHERE b.productId = $1 AND a.startat < $2 AND a.finishat > $2 " +
//			"ORDER BY a.discountId DESC " +
//			"LIMIT 1 OFFSET 0"
//		let current = try self.sqlRows(sql, params: params)
//		if current.count > 0 {
//			self.to(current[0])
//		}
	}
	
	func makeDiscount(sellingPrice: Double) {
		if self.discountPercentage > 0 {
			self.discountPrice = sellingPrice - (sellingPrice * Double(self.discountPercentage) / 100)
		} else {
			self.discountPercentage = Int((sellingPrice - self.discountPrice) / sellingPrice * 100.0)
		}
	}
}
