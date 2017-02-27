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
        let article = Article()
        try? article.setup()
        
        let articleAttributeValue = ArticleAttributeValue()
        try? articleAttributeValue.setup()
    }

    func build(productId: Int) throws -> Int {
        
        var countInserted: Int = 0
        
        //TODO: complete this func
        let product = Product()
        try product.get(productId)
        var barcode: Int = 1000000000001
        
        // Get product attributes
        let productAttribute = ProductAttribute()
        try productAttribute.select(
            whereclause: "productId = $1",
            params: [productId],
            orderby: ["attributeId"]
        )
        let productAttributes = try productAttribute.rows()
        
        // Create matrix indexes
        //var indexes = Array(repeating: Array(repeating: 0, count: 2), count: productAttributes.count)
        var indexes = [[Int]]()
        for attribute in productAttributes {
            let count = attribute._attributeValues.count - 1
            if count == -1 {
                throw StORMError.error("Not values found for attributeId: \(attribute.attributeId)")
            }
            indexes.append([0, count])
        }
        let lastIndex = indexes.count - 1
        
        // Invalidate product and articles
        product.isValid = false
        product.updated = Int.now()
        try product.save()

        let article = Article()
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
            var sql =
                "SELECT a.* " +
                "FROM articles as a " +
                "LEFT JOIN articleattributevalues as b ON a.articleid = b.articleid " +
                "WHERE a.productId = \(productId) AND b.productattributevalueid IN ("
            for i in 0...lastIndex {
                if i > 0 {
                    sql += ","
                }
                sql += "\(productAttributes[i]._attributeValues[indexes[i][0]].productAttributeValueId)"
            }
            sql += ") GROUP BY a.articleid HAVING count(b.productattributevalueid) = \(lastIndex + 1)"
            
            let current = try newArticle.sqlRows(sql, params: [String]())
            if current.count > 0 {
                newArticle.to(current[0])
                newArticle.isValid = true;
                try newArticle.save()
            }
            else {
                // Add article
                newArticle.productId = productId
                barcode += 1
                newArticle.barcode = "\(barcode)"
                newArticle.isValid = true;
                try add(item: newArticle)
                
                // Add article attribute values
                for i in 0...lastIndex {
                    let articleAttributeValue = ArticleAttributeValue()
                    articleAttributeValue.articleId = newArticle.articleId
                    articleAttributeValue.productAttributeValueId =
                        productAttributes[i]._attributeValues[indexes[i][0]].productAttributeValueId
                    try addAttributeValue(item: articleAttributeValue)
                }
                countInserted += 1
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
        let articles = try get(productId: productId)
        for item in articles {
            if !item.isValid {
                try item.delete()
            }
        }
        
        // Check integrity
        var count: Int = 1
        for attribute in productAttributes {
            count *= attribute._attributeValues.count
        }
        
        if articles.count == count {

            // Update product
            product.isValid = true
            product.updated = Int.now()
            try product.save()
        }
        
        return countInserted
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
