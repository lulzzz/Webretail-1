//
//  ArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ArticleProtocol {
    
    func build(productId: Int) throws -> [String:Any]

    func getAll() throws -> [Article]
    
    func get(productId: Int) throws -> [Article]
    
    func get(id: Int) throws -> Article?
    
	func getFormatted(productId: Int) throws -> [[String]]

	func add(item: Article) throws
    
    func update(id: Int, item: Article) throws
    
    func delete(id: Int) throws

    func addAttributeValue(item: ArticleAttributeValue) throws
    
    func removeAttributeValue(id: Int) throws
}
