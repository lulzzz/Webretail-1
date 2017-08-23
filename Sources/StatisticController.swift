//
//  StatisticController.swift
//  macWebretail
//
//  Created by Gerardo Grisolini on 20/06/17.
//  Copyright © 2017 Gerardo Grisolini. All rights reserved.
//

import Foundation
import PerfectHTTP

class StatisticController {
    
    private let repository: StatisticProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as StatisticProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/statistic/device", handler: statisticDeviceHandlerGET)
        routes.add(method: .get, uri: "/api/statistic/category/{year}", handler: statisticCategoryHandlerGET)
        routes.add(method: .get, uri: "/api/statistic/categoryformonth/{year}", handler: statisticCategoryformonthHandlerGET)
        routes.add(method: .get, uri: "/api/statistic/product/{year}", handler: statisticProductHandlerGET)
        routes.add(method: .get, uri: "/api/statistic/productformonth/{year}", handler: statisticProductformonthHandlerGET)
        
        return routes
    }

    func statisticDeviceHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        do {
            let items = try self.repository.getDevices()
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func statisticCategoryHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        do {
            let year = request.urlVariables["year"]!
            let items = try self.repository.getCategories(year: Int(year)!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
       }
    }

    func statisticCategoryformonthHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        do {
            let year = request.urlVariables["year"]!
            let items = try self.repository.getCategoriesForMonth(year: Int(year)!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func statisticProductHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        do {
            let year = request.urlVariables["year"]!
            let items = try self.repository.getProducts(year: Int(year)!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func statisticProductformonthHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        do {
            let year = request.urlVariables["year"]!
            let items = try self.repository.getProductsForMonth(year: Int(year)!)
            try response.setBody(json: items)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
