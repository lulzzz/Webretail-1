//
//  Article.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import StORM

class Article: PostgresSqlORM, Codable {
    
    public var articleId : Int = 0
    public var productId : Int = 0
    public var articleBarcodes : [Barcode] = [Barcode]()
    public var articleIsValid : Bool = false
    public var articleCreated : Int = Int.now()
    public var articleUpdated : Int = Int.now()

	public var _storeIds : String = ""
    public var _quantity : Double = 0
    public var _booked : Double = 0
    public var _attributeValues: [ArticleAttributeValue] = [ArticleAttributeValue]()

    private enum CodingKeys: String, CodingKey {
        case articleId
        case productId
        case articleBarcodes = "barcodes"
        case _quantity = "quantity"
        case _booked = "booked"
        case _attributeValues = "attributeValues"
    }

    open override func table() -> String { return "articles" }
   
    open override func to(_ this: StORMRow) {
        articleId = this.data["articleid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
        if let barcodes = this.data["articlebarcodes"] {
            let jsonData = try! JSONSerialization.data(withJSONObject: barcodes, options: [])
            articleBarcodes = try! JSONDecoder().decode([Barcode].self, from: jsonData)
        }
        articleIsValid = this.data["articleisvalid"] as? Bool ?? true
        articleCreated = this.data["articlecreated"] as? Int ?? 0
        articleUpdated = this.data["articleupdated"] as? Int ?? 0
    }
    
    func rows() throws -> [Article] {
        var rows = [Article]()
        for i in 0..<self.results.rows.count {
            let row = Article()
            row.to(self.results.rows[i])

            // get attributeValues
            let attributeValue = ArticleAttributeValue()
            try attributeValue.query(
                whereclause: "articleId = $1",
                params: [row.articleId],
                orderby: ["articleAttributeValueId"]
            )
            row._attributeValues = try attributeValue.rows()

			let stock = Stock()
			var stocks = [Stock]()
           	if _storeIds.isEmpty || _storeIds == "0" {
				try stock.query(
					whereclause: "articleId = $1",
					params: [row.articleId]
				)
				stocks.append(contentsOf: stock.rows())
			} else {
				let rows = try self.sqlRows(
					"SELECT * FROM stocks WHERE articleId = \(row.articleId) AND storeId IN (\(_storeIds))",
					params: [])
				for row in rows {
					let stock = Stock()
					stock.to(row)
					stocks.append(stock)
				}
			}
			row._quantity = stocks.reduce(0) { $0 + $1.stockQuantity }
			row._booked = stocks.reduce(0) { $0 + $1.stockBooked }
			
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
        articleId = try container.decode(Int.self, forKey: .articleId)
        productId = try container.decodeIfPresent(Int.self, forKey: .productId) ?? 0
        articleBarcodes = try container.decodeIfPresent([Barcode].self, forKey: .articleBarcodes) ?? [Barcode]()
        _attributeValues = try container.decodeIfPresent([ArticleAttributeValue].self, forKey: ._attributeValues) ?? [ArticleAttributeValue]()
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(articleId, forKey: .articleId)
        try container.encode(articleBarcodes, forKey: .articleBarcodes)
        try container.encode(_quantity, forKey: ._quantity)
        try container.encode(_booked, forKey: ._booked)
        try container.encode(_attributeValues, forKey: ._attributeValues)
    }
}
