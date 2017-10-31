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
import StORM
import PerfectSession


let server = HTTPServer()

// CORS
SessionConfig.CORS.enabled = true
SessionConfig.CORS.acceptableHostnames = ["*"]
SessionConfig.CORS.methods = [.get, .post, .put, .delete]
SessionConfig.CORS.withCredentials = true
SessionConfig.CORS.maxAge = 60

// Register dependency injection
addIoC()

// Error file location
LogFile.location = "./StORMlog.txt"

do {
    // Setup database
    try setupDatabase();

    // Launch the HTTP servers.
//    let tls = TLSConfiguration(certPath: "cert.pem", keyPath: "key.pem", alpnSupport: [.http2, .http11])
//    try HTTPServer.launch(
//        .secureServer(
//            tls,
//            name: "localhost",
//            port: 8181,
//            routes: getRoutesAndHandlers(),
//            requestFilters: getRequestFilters(),
//            responseFilters: getResponseFilters()
//        ),
//        .server(name: "localhost", port: 5000, documentRoot:  "./WebUI/dist"),
//        .server(name: "localhost", port: 5001, documentRoot:  "./AdminUI/dist")
//    )
    
    
    server.setRequestFilters(getRequestFilters())
    server.setResponseFilters(getResponseFilters())
    server.addRoutes(getRoutesAndHandlers())
    server.serverPort = 8181
    try server.start()

} catch StORMError.error(let msg) {
    print("Database error thrown: \(msg)")
} catch PerfectNetError.networkError(let msg) {
    print("Network error thrown: \(msg)")
} catch {
    print("System error thrown: \(error)")
}

