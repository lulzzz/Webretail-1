//
//  ArticleRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class ArticleRepository : ArticleProtocol {
    
    func getAll() throws -> [Article] {
        let items = Article()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Article? {
        let item = Article()
        try item.get(id)
        
        return item
    }
    
    func add(item: Article) throws {
        try item.save {
            id in item.articleId = id as! Int
        }
    }
    
    func update(id: Int, item: Article) throws {
        item.updated = Helper.now()
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Article()
        item.articleId = id
        try item.delete()
    }
}
