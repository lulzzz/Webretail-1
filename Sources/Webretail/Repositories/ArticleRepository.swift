//
//  ArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//n
//

import Foundation
import StORM

struct ArticleRepository : ArticleProtocol {

    func build(productId: Int) throws -> [String:Any] {
        
        var countAdded: Int = 0
        var countUpdated: Int = 0
        var countDeleted: Int = 0

        let product = Product()
        try product.get(productId)
        
        // Get product attributes
		var join = StORMDataSourceJoin()
		join.table = "attributes"
		join.direction = StORMJoinType.INNER
		join.onCondition = "productattributes.attributeId = attributes.attributeId"

		let productAttribute = ProductAttribute()
        try productAttribute.query(
            whereclause: "productattributes.productId = $1",
            params: [productId],
            orderby: ["productattributes.productAttributeId"],
            joins: [join]
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
        product.productIsValid = false
        product.productUpdated = Int.now()
        try product.save()

        let article = Article()
        try article.update(
            cols: ["articleIsValid"],
            params: [false],
            idName: "productId",
            idValue: productId
        )

        // Creation articles
        let company = Company()
        try company.query()
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
                newArticle.articleIsValid = true;
                try newArticle.save()
                countUpdated += 1
            }
            else {
                // Add article
                newArticle.productId = productId
                company.barcodeCounter += 1
                let barcode = Barcode()
                barcode.barcode = String(company.barcodeCounter)
                newArticle.articleBarcodes = [barcode]
                newArticle.articleIsValid = true;
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
        var articles = try get(productId: productId, storeIds: "0")
        for (i, item) in articles.enumerated() {
            if !item.articleIsValid {
                try item.delete()
                articles.remove(at: i - countDeleted)
                countDeleted += 1
                try item.sql("DELETE FROM articleattributevalues WHERE articleId = $1", params: [String(item.articleId)])
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
        product.productIsValid = true
        product.productUpdated = Int.now()
        try product.save()
        
        // Update barcode counter
        try company.save()
        
        var result = [String: Any]()
        result["added"] = countAdded
        result["updated"] = countUpdated
        result["deleted"] = countDeleted

        return result
    }
    
    func getAll() throws -> [Article] {
        let items = Article()
        try items.query()
        
        return try items.rows()
    }
    
	func get(productId: Int, storeIds: String) throws -> [Article] {
        let items = Article()
		items._storeIds = storeIds
		try items.query(whereclause: "productId = $1",
						params: [productId],
						orderby: ["articleId"],
						cursor: StORMCursor(limit: 10000, offset: 0))
		
        return try items.rows()
    }

    func get(id: Int) throws -> Article? {
        let item = Article()
		try item.query(id: id)
		
        return item
    }
    
	func getStock(productId: Int, storeIds: String) throws -> ArticleForm {
		var header = [String]()
		var body = [[ArticleItem]]()
		
		var productAttributeValues = [ProductAttributeValue]()
		var join = StORMDataSourceJoin()
		join.table = "attributes"
		join.direction = StORMJoinType.INNER
		join.onCondition = "productattributes.attributeId = attributes.attributeId"
		
		let productAttribute = ProductAttribute()
		try productAttribute.query(
			whereclause: "productattributes.productId = $1",
			params: [productId],
			orderby: ["productattributes.productAttributeId"],
			joins: [join]
		)
		let attributes = try productAttribute.rows();
		
		let lenght = attributes.count - 1;
		if (lenght > 0) {
			for attribute in attributes {
				header.append(attribute._attribute.attributeName)
				productAttributeValues.append(contentsOf: attribute._attributeValues)
			}
			header.removeLast()
			
			for value in attributes[lenght]._attributeValues {
				header.append(value._attributeValue.attributeValueName)
			}
		}
		
		let articles = try get(productId: productId, storeIds: storeIds)
		let grouped = articles.groupBy {
			$0._attributeValues.dropLast().reduce("") {
				a,b in "\(a)#\(b.attributeValueId)"
			}
		}
		
		for group in grouped.sorted(by: { $0.key < $1.key }) {
			var row = [ArticleItem]()
			var isFirst = true;
			for article in group.value {
                let barcode = article.articleBarcodes.first(where: { $0.tags.count == 0 })
				let articleItem = ArticleItem(
					id: article.articleId,
					value: barcode?.barcode ?? "",
					stock: article._quantity,
					booked: article._booked,
					data: 0.0
				)
				if (isFirst) {
					for value in article._attributeValues {
						let productAttributeValue = productAttributeValues.first(where: { pair -> Bool in
							return pair._attributeValue.attributeValueId == value.attributeValueId
						})
						let articleLabel = ArticleItem(
							id: 0,
							value: productAttributeValue?._attributeValue.attributeValueName ?? "",
							stock: 0.0,
							booked: 0.0,
							data: 0.0
						)
						row.append(articleLabel);
					}
					isFirst = false;
					row[row.count - 1] = articleItem;
				} else {
					row.append(articleItem);
				}
			}
			body.append(row)
		}
		
		return ArticleForm(header: header, body: body)
	}
	
	func add(item: Article) throws {
        item.articleCreated = Int.now()
        item.articleUpdated = Int.now()
        try item.save {
            id in item.articleId = id as! Int
        }
    }
    
    func update(id: Int, item: Article) throws {
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        // TODO: check this in test
        let itemBarcode = item.articleBarcodes.first(where: { $0.tags.count == 0 })
        if let newBarcode = itemBarcode {
            let currentBarcode = current.articleBarcodes.first(where: { $0.tags.count == 0 })
            currentBarcode?.barcode = newBarcode.barcode
        }
        current.articleUpdated = Int.now()
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
