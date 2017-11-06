//
//  AngularController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import PerfectHTTP
import PerfectHTTPServer

public class AngularController {

   func getRoutes() -> Routes {
        var routes = Routes()

        routes.add(method: .get, uri: "/home", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/company", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/login", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/account", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/brand", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/store", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/category", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/attribute", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/product", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/product/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/product/{id}/publication", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/product/{id}/stock", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/registry", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/causal", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/movement", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/movement/{id}", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/movement/document/{id}", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/discount", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/discount/{id}", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/invoice", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/invoice/{id}", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/invoice/document/{id}", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/device", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/report/receipts", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/report/sales", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/report/statistics", handler: HTTPHandler.angularHandler())
		routes.add(method: .get, uri: "/import", handler: HTTPHandler.angularHandler())

		return routes
    }
}
