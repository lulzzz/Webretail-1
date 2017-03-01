//
//  MovementArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

protocol MovementArticleProtocol {
    
    func getAll() throws -> [MovementArticle]
    
    func get(id: Int) throws -> MovementArticle?
    
    func add(item: MovementArticle) throws
    
    func update(id: Int, item: MovementArticle) throws
    
    func delete(id: Int) throws
}
