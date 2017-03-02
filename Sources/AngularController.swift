//
//  AngularController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import Foundation
import PerfectHTTP

public class AngularController {

    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/home", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/login", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/account", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/brand", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/category", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/attribute", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/product", handler: angularHandlerGET)
        routes.add(method: .get, uri: "/movement", handler: angularHandlerGET)
        
        return routes
    }

    func angularHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "text/html")
        
        let data = FileManager.default.contents(atPath: "./wwwroot/index.html")
        
        guard let content = String(data: data!, encoding: .utf8) else {
            response.completed(status: .notFound)
            return
        }

        response.appendBody(string: content)
        response.completed()
    }
}
