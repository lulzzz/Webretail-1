//
//  InvoiceRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 05/04/17.
//
//

import StORM

struct InvoiceRepository : InvoiceProtocol {
	
	func getPayments() -> [ItemValue] {
		var status = [ItemValue]()
		status.append(ItemValue(value: "Cash"))
		status.append(ItemValue(value: "Credit card"))
		status.append(ItemValue(value: "Bank transfer"))
		status.append(ItemValue(value: "Check"))
		return status
	}

	func getAll() throws -> [Invoice] {
		let items = Invoice()
		try items.query()
		
		return try items.rows()
	}
	
	func get(id: Int) throws -> Invoice? {
		let item = Invoice()
		try item.query(id: id)
		
		return item
	}
	
	func getMovements(invoiceId: Int) throws -> [Movement] {
		let items = Movement()
		try items.query(data: [("invoiceId", invoiceId)])
		
		return try items.rows()
	}
	
	func getMovementArticles(invoiceId: Int) throws -> [MovementArticle] {
		let items = MovementArticle()
		
		let join = StORMDataSourceJoin(
			table: "movements",
			onCondition:"movementarticles.movementId = movements.movementId",
			direction: StORMJoinType.INNER);

		try items.query(whereclause: "movements.invoiceId = $1",
		                params: [String(invoiceId)],
		                joins: [join])
		
		return items.rows()
	}

	func add(item: Invoice) throws {
		if item.invoiceNumber == 0 {
			try item.makeNumber()
		}
		item.invoiceUpdated = Int.now()
		try item.save {
			id in item.invoiceId = id as! Int
		}
	}
	
	func update(id: Int, item: Invoice) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		item.invoiceUpdated = Int.now()
		current.invoiceNumber = item.invoiceNumber
		current.invoiceDate = item.invoiceDate
		current.invoiceCustomer = item.invoiceCustomer
		current.invoiceNote = item.invoiceNote
		current.invoiceUpdated = item.invoiceUpdated
		try current.save()
	}
	
	func delete(id: Int) throws {
		let movement = Movement()
		try movement.update(data: [("invoiceId", 0)], idName:"invoiceId", idValue: id)

		let item = Invoice()
		item.invoiceId = id
		try item.delete()
	}
	
	func addMovement(invoiceId: Int, id: Int) throws {
		let movement = Movement()
		try movement.update(data: [("invoiceId", invoiceId)], idName:"movementId", idValue: id)
	}
	
	func removeMovement(id: Int) throws {
		let movement = Movement()
		try movement.update(data: [("invoiceId", 0)], idName:"movementId", idValue: id)
	}
}
