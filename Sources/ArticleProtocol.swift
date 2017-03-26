//
//  ArticleProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import PerfectLib

protocol ArticleProtocol {
    
    func build(productId: Int) throws -> [String: Any]

    func getAll() throws -> [Article]
    
    func get(productId: Int, storeIds: String) throws -> [Article]
    
    func get(id: Int) throws -> Article?
    
	func getStock(productId: Int, storeIds: String) throws -> ArticleForm

	func add(item: Article) throws
    
    func update(id: Int, item: Article) throws
    
    func delete(id: Int) throws

    func addAttributeValue(item: ArticleAttributeValue) throws
    
    func removeAttributeValue(id: Int) throws
}


struct ArticleForm: JSONConvertible {
	public var header: [String]
	public var body: [[ArticleItem]]

	func getJSONValues() -> [String: Any] {
		return [
			"header": header,
			"body": body
		]
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
}

struct ArticleItem: JSONConvertible {
	public var id: Int
	public var label: String
	public var value: String
	public var data: Double

	func getJSONValues() -> [String: Any] {
		return [
			"id": id,
			"label": label,
			"value": value,
			"data": data
		]
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
}
