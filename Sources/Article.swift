//
//  Article.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PerfectLib

class Article: PostgresSqlORM, JSONConvertible {
    
    public var articleId	: Int = 0
    public var productId : Int = 0
    public var articleBarcode : String = ""
    public var articleIsValid : Bool = false
    public var articleCreated : Int = Int.now()
    public var articleUpdated : Int = Int.now()

	public var _storeIds : String = ""
    public var _quantity : Double = 0
    public var _booked : Double = 0
    public var _attributeValues: [ArticleAttributeValue] = [ArticleAttributeValue]()

    
    open override func table() -> String { return "articles" }
    open override func tableIndexes() -> [String] { return ["articleBarcode"] }
   
    open override func to(_ this: StORMRow) {
        articleId = this.data["articleid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
        articleBarcode = this.data["articlebarcode"] as? String ?? ""
        articleIsValid = this.data["articleisvalid"] as? Bool ?? false
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
    
    public func setJSONValues(_ values:[String:Any]) {
        self.articleId = getJSONValue(named: "articleId", from: values, defaultValue: 0)
        self.productId = getJSONValue(named: "productId", from: values, defaultValue: 0)
        self.articleBarcode = getJSONValue(named: "articleBarcode", from: values, defaultValue: "")
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "articleId": articleId,
            //"productId": productId,
            "articleBarcode": articleBarcode,
            "quantity": _quantity,
            "booked": _booked,
            "attributeValues": _attributeValues
        ]
    }
}
