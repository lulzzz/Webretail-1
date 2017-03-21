//
//  MyOrderArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//

protocol MyOrderArticleProtocol {
	
	func get(myOrderId: Int) throws -> [MyOrderArticle]
	
	func get(id: Int) throws -> MyOrderArticle?
	
	func add(item: MyOrderArticle) throws
	
	func update(id: Int, item: MyOrderArticle) throws
	
	func delete(id: Int) throws
}
