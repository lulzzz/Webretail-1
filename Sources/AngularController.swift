//
//  AngularController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import PerfectHTTP

public class AngularController {

    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get,  uri: "/home", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/login", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/account", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/brand", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/category", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/attribute", handler: angularHandlerGET)
        routes.add(method: .get,  uri: "/product", handler: angularHandlerGET)
        
        return routes
    }

    func angularHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        //response.setHeader(.contentType, value: "application/json")
        request.path = "/"
    }
}
