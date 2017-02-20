//
//  ArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class ArticleRepository : ArticleProtocol {
    
    func build(productId: Int) throws {
        
        //TODO: complete this func
        
        let item1 = Article()
        item1.productId = productId
        item1.barcode = "11111111111"
        try add(item: item1)
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
