//
//  ArticleAttributeValueProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ArticleAttributeValueProtocol {
    
    func getAll() throws -> [ArticleAttributeValue]
    
    func get(id: Int) throws -> ArticleAttributeValue?
    
    func add(item: ArticleAttributeValue) throws
    
    func update(id: Int, item: ArticleAttributeValue) throws
    
    func delete(id: Int) throws
}
