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

        routes.add(method: .get, uri: "/", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/home", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/account", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/login", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/register", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/products/{id}/{name}", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/product/{id}", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/basket", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/basket/{barcode}", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/checkout", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/orders", handler: HTTPHandler.angularHandler(webapi: false))
        routes.add(method: .get, uri: "/web/document/{id}", handler: HTTPHandler.angularHandler(webapi: false))
    
        routes.add(method: .get, uri: "/admin", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/home", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/company", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/login", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/account", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/brand", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/store", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/category", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/attribute", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/tag", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/product", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/product/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/product/{id}/publication", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/product/{id}/stock", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/registry", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/causal", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/movement", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/movement/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/movement/document/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/discount", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/discount/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/invoice", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/invoice/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/invoice/document/{id}", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/device", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/report/receipts", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/report/sales", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/report/statistics", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/import", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/amazon", handler: HTTPHandler.angularHandler())
        routes.add(method: .get, uri: "/admin/cart", handler: HTTPHandler.angularHandler())

        return routes
    }
}
