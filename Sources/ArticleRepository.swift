//
//  ArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//n
//

import StORM

class ArticleRepository : ArticleProtocol {
    
    func build(productId: Int) throws {
        
        //TODO: complete this func
        
        let productAttribute = ProductAttribute()
        try productAttribute.find([("productId", productId)])
        let productAttributes = try productAttribute.rows()
        
        //var indexes = Array(repeating: Array(repeating: 0, count: 2), count: productAttributes.count)
        var indexes = [[Int]]()
        for attribute in productAttributes {
            indexes.append([0, attribute.internal_attributeValues.count])
        }
        let lastIndex = indexes.count - 1
        
        while indexes[0].reduce(0, +) >= 0 {
            let article = Article()
            article.barcode = "010101"
            try add(item: article)
            
            for i in 0...lastIndex {
                let articleAttributeValue = ArticleAttributeValue()
                articleAttributeValue.articleId = article.articleId
                articleAttributeValue.productAttributeValueId =
                    productAttributes[i].internal_attributeValues[indexes[0][i]].productAttributeValueId
                try addAttributeValue(item: articleAttributeValue)
            }
            
            var index = lastIndex
            while index >= 0 {
                indexes[0][index] += 1
                if indexes[0][index] <= indexes[1][index] {
                    break
                }
                indexes[0][index] = 0
                index -= 1
            }
        }
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
        item.created = Helper.now()
        item.updated = Helper.now()
        try item.save {
            id in item.articleId = id as! Int
        }
    }
    
    func update(id: Int, item: Article) throws {
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.barcode = item.barcode
        current.updated = Helper.now()
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
