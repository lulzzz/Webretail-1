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
            indexes.append([0, attribute.internal_attributeValues.count - 1])
        }
        let lastIndex = indexes.count - 1
        var index = 0
        
        while index >= 0 { //indexes[0].reduce(0, +) <= indexes[1].reduce(0, +) {
            let article = Article()
            article.productId = productId
            article.barcode = "010101"
            try add(item: article)
            
            for i in 0...lastIndex {
                let articleAttributeValue = ArticleAttributeValue()
                articleAttributeValue.articleId = article.articleId
                articleAttributeValue.productAttributeValueId =
                    productAttributes[i].internal_attributeValues[indexes[i][0]].productAttributeValueId
                try addAttributeValue(item: articleAttributeValue)
            }
            
            index = lastIndex
            while index >= 0 {
                if indexes[index][0] < indexes[index][1] {
                    indexes[index][0] += 1
                    break
                }
                index -= 1
                if index > -1 && indexes[index][0] < indexes[index][1] {
                    indexes[index + 1][0] = 0
                }
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
