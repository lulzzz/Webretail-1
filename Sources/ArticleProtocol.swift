//
//  ArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ArticleProtocol {
    
    func getAll() throws -> [Article]
    
    func get(id: Int) throws -> Article?
    
    func add(item: Article) throws
    
    func update(id: Int, item: Article) throws
    
    func delete(id: Int) throws
}
