//
//  ProductCategory.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ProductCategory: PostgresSqlORM, Codable {
    
    public var productCategoryId : Int = 0
    public var productId : Int = 0
    public var categoryId : Int = 0
    
    public var _category: Category = Category()

    private enum CodingKeys: String, CodingKey {
        case productId
        case _category = "category"
    }

    open override func table() -> String { return "productcategories" }
    
    open override func to(_ this: StORMRow) {
        productCategoryId	= this.data["productcategoryid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
        categoryId = this.data["categoryid"] as? Int ?? 0
    }
    
    func rows() throws -> [ProductCategory] {
        var rows = [ProductCategory]()
        for i in 0..<self.results.rows.count {
            let row = ProductCategory()
            row.to(self.results.rows[i])
			row._category.to(self.results.rows[i])
			
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
        productId = try container.decodeIfPresent(Int.self, forKey: .productId) ?? 0
        _category = try container.decode(Category.self, forKey: ._category)
        categoryId = _category.categoryId
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(productId, forKey: .productId)
        try container.encode(_category, forKey: ._category)
    }
}
