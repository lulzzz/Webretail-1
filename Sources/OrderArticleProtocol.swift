//
//  OrderArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

protocol OrderArticleProtocol {
	
	func get(orderId: Int) throws -> [OrderArticle]
	
	func get(id: Int) throws -> OrderArticle?
	
	func add(item: OrderArticle) throws
	
	func update(id: Int, item: OrderArticle) throws
	
	func delete(id: Int) throws
}
