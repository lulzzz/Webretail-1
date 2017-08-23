//
//  MovementArticle.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

import StORM
import PerfectLib

class MovementArticle: PostgresSqlORM, JSONConvertible {
    
    public var movementArticleId : Int = 0
    public var movementId : Int = 0
    public var movementArticleBarcode : String = ""
    public var movementArticleProduct : [String:Any] = [String:Any]()
    public var movementArticleQuantity : Double = 0
	public var movementArticlePrice : Double = 0
	public var movementArticleUpdated : Int = Int.now()
	
    open override func table() -> String { return "movementarticles" }
      
    open override func to(_ this: StORMRow) {
        movementArticleId = this.data["movementarticleid"] as? Int ?? 0
        movementId = this.data["movementid"] as? Int ?? 0
        movementArticleBarcode = this.data["movementarticlebarcode"] as? String ?? ""
        movementArticleProduct = try! (this.data["movementarticleproduct"] as? String)?.jsonDecode() as! [String:Any]
        movementArticleQuantity = this.data["movementarticlequantity"] as? Double ?? 0
		movementArticlePrice = this.data["movementarticleprice"] as? Double ?? 0
		movementArticleUpdated = this.data["movementarticleupdated"] as? Int ?? 0
    }
    
    func rows() -> [MovementArticle] {
        var rows = [MovementArticle]()
        for i in 0..<self.results.rows.count {
            let row = MovementArticle()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    func setJSONValues(_ values:[String:Any]) {
        self.movementArticleId = getJSONValue(named: "movementArticleId", from: values, defaultValue: 0)
        self.movementId = getJSONValue(named: "movementId", from: values, defaultValue: 0)
        self.movementArticleBarcode = getJSONValue(named: "movementArticleBarcode", from: values, defaultValue: "")
		let product = try! self.getProduct(barcode: self.movementArticleBarcode)
		if product != nil {
			self.movementArticleProduct = try! product!.getJSONValues()
		} else {
			self.movementArticleProduct = getJSONValue(named: "movementArticleProduct", from: values, defaultValue: [String:Any]())
		}
        self.movementArticleQuantity = getJSONValue(named: "movementArticleQuantity", from: values, defaultValue: 1.0)
		self.movementArticlePrice = getJSONValue(named: "movementArticlePrice", from: values, defaultValue: 0.0)
    }
	
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "movementArticleId": movementArticleId,
            "movementId": movementId,
            "movementArticleBarcode": movementArticleBarcode,
            "movementArticleProduct": movementArticleProduct,
            "movementArticleQuantity": movementArticleQuantity.roundCurrency(),
            "movementArticlePrice": movementArticlePrice.roundCurrency(),
            "movementArticleAmount": (movementArticleQuantity * movementArticlePrice).roundCurrency()
        ]
    }

	func getProduct(barcode: String) throws -> Product? {
		let brandJoin = StORMDataSourceJoin(
			table: "brands",
			onCondition: "products.brandId = brands.brandId",
			direction: StORMJoinType.INNER
		)
		let articleJoin = StORMDataSourceJoin(
			table: "articles",
			onCondition: "products.productId = articles.productId",
			direction: StORMJoinType.INNER
		)
		
		let product = Product()
		try product.query(whereclause: "articles.articleBarcode = $1",
		                  params: [barcode],
		                  cursor: StORMCursor(limit: 1, offset: 0),
		                  joins: [brandJoin, articleJoin])
		if product.productId == 0 {
			return nil
		}
		
		try product.makeDiscount()
		try product.makeCategories()
		try product.makeAttributes()
		try product.makeArticle(barcode: barcode)
		
		return product
	}
}
