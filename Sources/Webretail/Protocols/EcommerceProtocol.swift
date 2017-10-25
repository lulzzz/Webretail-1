//
//  EcommerceProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

protocol EcommerceProtocol {
    
    func getPublished() throws -> [Product]
    
    func getFeatured() throws -> [Product]
    
    func getCategories() throws -> [Category]
    
    func getPublished(categoryId: Int) throws -> [Product]
}

