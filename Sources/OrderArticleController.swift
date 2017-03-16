//
//  OrderArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 15/03/17.
//
//

import PerfectHTTP
import PerfectLogger

class OrderArticleController {
	
	private let orderRepository: OrderArticleProtocol
	private let productRepository: ProductProtocol
	
	init() {
		self.orderRepository = ioCContainer.resolve() as OrderArticleProtocol
		self.productRepository = ioCContainer.resolve() as ProductProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/orderarticle/{id}", handler: orderArticlesHandlerGET)
		routes.add(method: .post, uri: "/api/orderarticle", handler: orderArticleHandlerPOST)
		routes.add(method: .put, uri: "/api/orderarticle/{id}", handler: orderArticleHandlerPUT)
		routes.add(method: .delete, uri: "/api/orderarticle/{id}", handler: orderArticleHandlerDELETE)
		
		return routes
	}
	
	func orderArticlesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let items = try self.orderRepository.get(orderId: id.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderArticleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = OrderArticle()
			item.setJSONValues(json!)
			guard let product = try self.productRepository.get(barcode: item.barcode) else {
				response.completed(status: .notFound)
				return
			}
			item.product = try product.getJSONValues()
			item.price = product.sellingPrice
			try self.orderRepository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderArticleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = OrderArticle()
			item.setJSONValues(json!)
			try self.orderRepository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func orderArticleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.orderRepository.delete(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
}
