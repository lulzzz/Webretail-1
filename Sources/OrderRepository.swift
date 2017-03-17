//
//  OrderRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import Foundation
import StORM
import TurnstileCrypto

class OrderRepository : OrderProtocol {
	
	init() {
		let order = Order()
		try? order.setup()
	}
	
	func getAll() throws -> [Order] {
		let items = Order()
		try items.findAll()
		
		return try items.rows()
	}
	
	func get(id: Int) throws -> Order? {
		let item = Order()
		try item.get(id)
		
		// get store
		let store = Store()
		try store.get(item.storeId)
		item._store = store
		
		// get causal
		let causal = Causal()
		try causal.get(item.causalId)
		item._causal = causal

		// get customer
		let customer = Customer()
		try customer.get(item.customerId)
		item._customer = customer

		return item
	}
	
	func add(item: Order) throws {
		item.created = Int.now()
		item.updated = Int.now()
		try item.save {
			id in item.orderId = id as! Int
		}
	}
	
	func update(id: Int, item: Order) throws {
		
		guard let current = try get(id: id) else {
			throw StORMError.noRecordFound
		}
		
		current.causalId = item.causalId
		current.storeId = item.storeId
		current.customerId = item.customerId
		current.orderNumber = item.orderNumber
		current.orderDate = item.orderDate
		current.orderNote = item.orderNote
		current.orderStatus = item.orderStatus
		current.updated = Int.now()
		try current.save()
	}
	
	func delete(id: Int) throws {
		let item = Order()
		item.orderId = id
		try item.delete()
	}
	
	func getStatus() -> [OrderStatus] {
		var status = [OrderStatus]()
		status.append(OrderStatus(value: "New"))
		status.append(OrderStatus(value: "Processing"))
		status.append(OrderStatus(value: "Suspended"))
		status.append(OrderStatus(value: "Canceled"))
		status.append(OrderStatus(value: "Completed"))
		return status
	}
	
	func generatePdf(id: Int) {
		
		
		let aPDFDocument = PDFDocument()
		
		let coverPage = CoverPDFPage(hasMargin: true,
		                             title: "This is the cover page title. Keep it short or keep it long",
		                             creditInformation: "Created By: Knowstack.com \r Jan 2016",
		                             headerText: "Some confidential info",
		                             footerText: "www.knowstack.com",
		                             pageWidth: CGFloat(900.0),
		                             pageHeight: CGFloat(1200.0),
		                             hasPageNumber: true,
		                             pageNumber: 1)
		
		
		
		aPDFDocument.insertPage(coverPage, atIndex: 0)
		
		let pageWidth = (CGFloat(Float(self.columnInformationArray.count)) * defaultColumnWidth) + leftMargin
		let pageHeight = topMargin + verticalPadding + (CGFloat(numberOfRowsPerPage + 1) * defaultRowHeight) + verticalPadding + bottomMargin
		
		
		var numberOfPages = self.dataArray.count / numberOfRowsPerPage
		
		if self.dataArray.count % numberOfRowsPerPage > 0 {
			numberOfPages++
		}
		
		for var i = 0; i < numberOfPages; i++
		{
			
			let startIndex = i * numberOfRowsPerPage
			var endIndex = i * numberOfRowsPerPage + numberOfRowsPerPage
			
			if endIndex > self.dataArray.count{
				endIndex = self.dataArray.count
			}
			
			let pdfDataArray:[AnyObject] = Array(self.dataArray[startIndex..<endIndex])
			
			let tabularDataPDF = TabularPDFPage (hasMargin: true,
			                                     headerText: "confidential info...",
			                                     footerText: "www.knowstack.com",
			                                     pageWidth: pageWidth,
			                                     pageHeight: pageHeight,
			                                     hasPageNumber: true,
			                                     pageNumber: i+1,
			                                     pdfData: pdfDataArray,
			                                     columnArray: columnInformationArray)
			
			aPDFDocument.insertPage(tabularDataPDF, atIndex: i+1)
		}
		
		aPDFDocument.writeToFile("/Users/debasisdas/sample1.pdf") //Replace the folder location where you want to download or use a save panel
	}
}
