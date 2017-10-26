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


    func getBasket(customerId: Int) throws -> [Basket]
    
    func addBasket(item: Basket) throws

    func updateBasket(id: Int, item: Basket) throws
    
    func deleteBasket(id: Int) throws

    func commitBasket(customerId: Int) throws
}

