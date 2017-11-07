//
//  MovementProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 01/03/17.
//
//

protocol MovementProtocol {
    
	func getPayments() -> [ItemValue]

    func getStatus() -> [ItemValue]

	func getAll() throws -> [Movement]
	
    func getAll(device: String, user: String, date: Int) throws -> [Movement]
    
    func getSales(period: Period) throws -> [MovementArticle]
	
	func getReceipted(period: Period) throws -> [Movement]
	
	func get(customerId: Int) throws -> [Movement]

	func get(id: Int) throws -> Movement?
    
    func add(item: Movement) throws
    
    func update(id: Int, item: Movement) throws
    
    func delete(id: Int) throws

	func clone(sourceId: Int) throws -> Movement
	
	func process(movement: Movement, actionType: ActionType) throws
}
