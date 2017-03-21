//
//  MyOrderArticleController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/03/17.
//
//


import PerfectHTTP
import PerfectLogger

class MyOrderArticleController {
	
	private let myOrderRepository: MyOrderArticleProtocol
	private let productRepository: ProductProtocol
	
	init() {
		self.myOrderRepository = ioCContainer.resolve() as MyOrderArticleProtocol
		self.productRepository = ioCContainer.resolve() as ProductProtocol
	}
	
	func getRoutes() -> Routes {
		var routes = Routes()
		
		routes.add(method: .get, uri: "/api/myorderarticle/{id}", handler: myOrderArticlesHandlerGET)
		routes.add(method: .post, uri: "/api/myorderarticle", handler: myOrderArticleHandlerPOST)
		routes.add(method: .put, uri: "/api/myorderarticle/{id}", handler: myOrderArticleHandlerPUT)
		routes.add(method: .delete, uri: "/api/myorderarticle/{id}", handler: myOrderArticleHandlerDELETE)
		
		return routes
	}
	
	func myOrderArticlesHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let items = try self.myOrderRepository.get(myOrderId: id.toInt()!)
			try response.setBody(json: items)
			response.completed(status: .ok)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func myOrderArticleHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = MyOrderArticle()
			item.setJSONValues(json!)
			guard let product = try self.productRepository.get(barcode: item.barcode) else {
				response.completed(status: .notFound)
				return
			}
			item.product = try product.getJSONValues()
			item.price = product.sellingPrice
			try self.myOrderRepository.add(item: item)
			try response.setBody(json: item)
			response.completed(status: .created)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func myOrderArticleHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = MyOrderArticle()
			item.setJSONValues(json!)
			try self.myOrderRepository.update(id: id.toInt()!, item: item)
			try response.setBody(json: item)
			response.completed(status: .accepted)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
	
	func myOrderArticleHandlerDELETE(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		let id = request.urlVariables["id"]!
		do {
			try self.myOrderRepository.delete(id: id.toInt()!)
			response.completed(status: .noContent)
		} catch {
			LogFile.error("\(request.uri) \(request.method): \(error)")
			response.badRequest(error: error)
		}
	}
}
