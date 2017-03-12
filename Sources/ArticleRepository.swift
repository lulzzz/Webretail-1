//
//  ArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//n
//

import Foundation
import StORM
import TurnstileCrypto

class ArticleRepository : ArticleProtocol {
    
    init() {
        try? Article().setup()
        try? ArticleAttributeValue().setup()
        try? Stock().setup()

		_ = try? getFormatted(productId: 1)
	}

    func build(productId: Int) throws -> [String:Any] {
        
        var countAdded: Int = 0
        var countUpdated: Int = 0
        var countDeleted: Int = 0
        
        //TODO: complete this func
        let product = Product()
        try product.get(productId)
        
        // Get product attributes
        let productAttribute = ProductAttribute()
        try productAttribute.select(
            whereclause: "productId = $1",
            params: [productId],
            orderby: ["productAttributeId"]
        )
        let productAttributes = try productAttribute.rows()
        
        // Create matrix indexes
        var indexes = [[Int]]()
        for attribute in productAttributes {
            let count = attribute._attributeValues.count - 1
            if count == -1 {
                throw StORMError.error("Not values found for attribute: \(attribute._attribute.attributeName)")
            }
            indexes.append([0, count])
        }
        let lastIndex = indexes.count - 1
        
        // Invalidate product and articles
        product.isValid = false
        product.updated = Int.now()
        try product.save()

        let article = Article()
        
        // TODO: fix barcode counter
        var barcode: Int = 1000000000001
        let cursor = StORMCursor(limit: 1, offset: 0)
        try article.select(whereclause: "", params: [], orderby: ["barcode DESC"], cursor: cursor)
        let rows = try article.rows();
        if (rows.count > 0) {
            barcode = Int(rows[0].barcode)!
        }
        
        try article.update(
            cols: ["isValid"],
            params: [false],
            idName: "productId",
            idValue: productId
        )

        // Creation articles
        var index = 0
        while index >= 0 {
            
            // Check if exist article
            let newArticle = Article()
            var params = [String]()
            params.append(String(productId))
            var sql =
                "SELECT a.* " +
                "FROM articles as a " +
                "LEFT JOIN articleattributevalues as b ON a.articleid = b.articleid " +
                "WHERE a.productId = $1 AND b.attributevalueid IN ("
            for i in 0...lastIndex {
                if i > 0 {
                    sql += ","
                }
                params.append(String(productAttributes[i]._attributeValues[indexes[i][0]].attributeValueId))
                sql += "$\(i + 2)"
            }
            sql += ") GROUP BY a.articleid HAVING count(b.attributevalueid) = $\(lastIndex + 3)"
            params.append(String(lastIndex + 1))
            
            let current = try newArticle.sqlRows(sql, params: params)
            if current.count > 0 {
                newArticle.to(current[0])
                newArticle.isValid = true;
                try newArticle.save()
                countUpdated += 1
            }
            else {
                // Add article
                newArticle.productId = productId
                barcode += 1
                newArticle.barcode = String(barcode)
                newArticle.isValid = true;
                try add(item: newArticle)
                
                // Add article attribute values
                for i in 0...lastIndex {
                    let articleAttributeValue = ArticleAttributeValue()
                    articleAttributeValue.articleId = newArticle.articleId
                    articleAttributeValue.attributeValueId = productAttributes[i]._attributeValues[indexes[i][0]].attributeValueId
                    try addAttributeValue(item: articleAttributeValue)
                }
                countAdded += 1
            }
            
            // Recalculate matrix indexes
            index = lastIndex
            while index >= 0 {
                if indexes[index][0] < indexes[index][1] {
                    indexes[index][0] += 1
                    break
                }
                index -= 1
                if index > -1 && indexes[index][0] < indexes[index][1] {
                    for i in index + 1...lastIndex {
                        indexes[i][0] = 0
                    }
                }
            }
        }

        // Clean articles
        var articles = try get(productId: productId)
        for (i, item) in articles.enumerated() {
            if !item.isValid {
                try item.delete()
                articles.remove(at: i - countDeleted)
                countDeleted += 1
            }
        }
        
        // Check integrity
        var count: Int = 1
        for attribute in productAttributes {
            count *= attribute._attributeValues.count
        }
        if articles.count != count {
            throw StORMError.error("Integrity error: \(count) budgeted items and \(articles.count) items found")
        }

        // Commit update product
        product.isValid = true
        product.updated = Int.now()
        try product.save()
        
        var result = [String: Any]()
        result["added"] = countAdded
        result["updated"] = countUpdated
        result["deleted"] = countDeleted

        return result
    }
    
    func getAll() throws -> [Article] {
        let items = Article()
        try items.findAll()
        
        return try items.rows()
    }
    
    func get(productId: Int) throws -> [Article] {
        let items = Article()
        try items.find([("productId", productId)])
        
        return try items.rows()
    }

    func get(id: Int) throws -> Article? {
        let item = Article()
        try item.get(id)
        
        return item
    }
    
	func getFormatted(productId: Int) throws -> [[String]] {
		var rows = [[String]]()
		var productAttributeValues = [ProductAttributeValue]()
		
		let productAttribute = ProductAttribute()
		try productAttribute.find([("productId", productId)])
		let attributes = try productAttribute.rows();
		let lenght = attributes.count - 1;
	
		if (lenght > 0) {
			var row = [String]()
			for attribute in attributes {
				row.append(attribute._attribute.attributeName)
				productAttributeValues.append(contentsOf: attribute._attributeValues)
			}
			row.removeLast()
			
			for value in attributes[lenght]._attributeValues {
				row.append(value._attributeValue.attributeValueName)
			}
			rows.append(row)
		}
		
		let articles = try get(productId: productId)
		
		let grouped = articles.groupBy {
			$0._attributeValues.dropLast().reduce("") {
				a,b in "\(a)#\(b.attributeValueId)"
			}
		}

		for group in grouped {
			var isFirst = true;
			var row = [String]()
			for article in group.value {
				let qta = article._quantity;
				if (isFirst) {
					for value in article._attributeValues {
						let productAttributeValue = productAttributeValues.first(where: { pair -> Bool in
							return pair._attributeValue.attributeValueId == value.attributeValueId
						})
						row.append((productAttributeValue?._attributeValue.attributeValueName)!);
					}
					isFirst = false;
					row[row.count - 1] = "\(qta)";
				} else {
					row.append("\(qta)");
				}
			}
			rows.append(row)
		}
		
		return rows;
	}
	
	func makeBigger(value: [ArticleAttributeValue]) -> String {
		return value.reduce("", { "\($1.attributeValueId)#\($0)" })
		//return value.joined(separator: "#")
	}
	
	func add(item: Article) throws {
        item.created = Int.now()
        item.updated = Int.now()
        try item.save {
            id in item.articleId = id as! Int
        }
    }
    
    func update(id: Int, item: Article) throws {
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.barcode = item.barcode
        current.updated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Article()
        item.articleId = id
        try item.delete()
    }

    func addAttributeValue(item: ArticleAttributeValue) throws {
        try item.save {
            id in item.articleAttributeValueId = id as! Int
        }
    }
    
    func removeAttributeValue(id: Int) throws {
        let item = ArticleAttributeValue()
        item.articleAttributeValueId = id
        try item.delete()
    }
}
