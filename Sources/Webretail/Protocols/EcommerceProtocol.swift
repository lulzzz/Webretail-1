//
//  EcommerceProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 25/10/17.
//

protocol EcommerceProtocol {
    
    func getCategories() throws -> [Category]

    func getBrands() throws -> [Brand]

    
    func getProductsNews() throws -> [Product]

    func getProductsFeatured() throws -> [Product]

    func getProducts(category: String) throws -> [Product]

    func getProduct(name: String) throws -> Product

    
    func getBasket(registryId: Int) throws -> [Basket]
    
    func addBasket(item: Basket) throws

    func updateBasket(id: Int, item: Basket) throws
    
    func deleteBasket(id: Int) throws


    func addOrder(registryId: Int, payment: String) throws -> Movement

    func getOrders(registryId: Int) throws -> [Movement]

    func getOrder(registryId: Int, id: Int) throws -> Movement

    func getOrderItems(registryId: Int, id: Int) throws -> [MovementArticle]
}

