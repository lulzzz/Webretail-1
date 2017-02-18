//
//  ArticleAttributeValueRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class ArticleAttributeValueRepository : ArticleAttributeValueProtocol {
    
    func getAll() throws -> [ArticleAttributeValue] {
        let items = ArticleAttributeValue()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> ArticleAttributeValue? {
        let item = ArticleAttributeValue()
        try item.get(id)
        
        return item
    }
    
    func add(item: ArticleAttributeValue) throws {
        try item.save {
            id in item.articleAttributeValueId = id as! Int
        }
    }
    
    func update(id: Int, item: ArticleAttributeValue) throws {
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = ArticleAttributeValue()
        item.articleAttributeValueId = id
        try item.delete()
    }
}
