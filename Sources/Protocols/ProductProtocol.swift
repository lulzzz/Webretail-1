//
//  ProductProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol ProductProtocol {
    
    func getAll(date: Int) throws -> [Product]
    
    func get(id: Int) throws -> Product?

    func add(item: Product) throws
    
    func create(item: Product) throws

    func update(id: Int, item: Product) throws
    
    func delete(id: Int) throws

    func addCategory(item: ProductCategory) throws

    func removeCategory(item: ProductCategory) throws

	func removeCategories(productId: Int) throws

	func addAttribute(item: ProductAttribute) throws
    
    func removeAttribute(item: ProductAttribute) throws

    func addAttributeValue(item: ProductAttributeValue) throws
    
    func removeAttributeValue(item: ProductAttributeValue) throws
}
