//
//  main.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//	Copyright (C) 2017 Gerardo Grisolini
//
//===----------------------------------------------------------------------===//
//
// This source file is part of the Webretail open source project
//
// Copyright (c) 2017 Gerardo Grisolini and the Webretail project authors
// Licensed under Apache License v2.0
//
// See http://webretail.com/licensing.html for license information
//
//===----------------------------------------------------------------------===//
//

import PerfectNet
import PerfectHTTP
import PerfectHTTPServer
import PerfectLogger
import PerfectThread
import Turnstile
import StORM


// CORS
SessionConfig.CORS.enabled = true
SessionConfig.CORS.acceptableHostnames = ["*"]
SessionConfig.CORS.methods = [.get, .post, .put, .delete, .options, .head]
SessionConfig.CORS.allowHeaders = ["Access-Control-*","Origin","Content-Type","Accept","Authorization"]
SessionConfig.CORS.withCredentials = true
SessionConfig.CORS.maxAge = 3000

// Error file location
LogFile.location = "./StORMlog.txt"

// Certs
let cert = (sslCert: "cert.pem", sslKey: "key.pem")

// Create HTTP server.
let server = HTTPServer()
server.serverPort = 8181
server.documentRoot = "./webroot"
server.ssl = cert
server.alpnSupport = [.http11, .http2]

// Register dependency injection
addIoC()

// Register filters
addFilters()

// Register routes and handlers
addRoutesAndHandlers()

// Angular routes
let angularRoutes = [
    Route(method: .get, uri: "/**", handler: try! HTTPHandler.staticFiles(data: ["documentRoot": "./WebUI/dist"])),
    Route(method: .get, uri: "/home", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/account", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/login", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/register", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/products/{id}/{name}", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/product/{id}", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/basket", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/checkout", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/orders", handler: HTTPHandler.angularHandler(webapi: false)),
    Route(method: .get, uri: "/document/{id}", handler: HTTPHandler.angularHandler(webapi: false))
]

// Launch the Web server.
Threading.dispatch {
    _ = try? HTTPServer.launch(
//        .secureServer(
//            TLSConfiguration(certPath: cert.sslCert, keyPath: cert.sslKey, alpnSupport: server.alpnSupport),
//            name: "",
//            port: 8282,
//            routes: angularRoutes
//        ),
        .server(
            name: "",
            port: 8080,
            routes: angularRoutes
        )
    )
}

do {
    // Setup database
    try setupDatabase()

    // Launch the WebApi server.
    try server.start()

} catch StORMError.error(let msg) {
    print("Database error thrown: \(msg)")
} catch PerfectNetError.networkError(let msg) {
    print("Network error thrown: \(msg)")
} catch {
    print("System error thrown: \(error)")
}



