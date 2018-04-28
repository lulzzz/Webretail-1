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

import Foundation
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

// Create HTTPS server.
let serverSecure = HTTPServer()
serverSecure.serverName = "www.webretail.cloud"
serverSecure.documentRoot = "./webroot"
serverSecure.ssl = (sslCert: "certificate.crt", sslKey: "private.pem")
serverSecure.alpnSupport = [.http11, .http2]
serverSecure.serverPort = 8181

// Create HTTP server.
let server = HTTPServer()
server.serverName = "www.webretail.cloud"
server.documentRoot = "./webroot"
server.serverPort = 8080
if let portString = ProcessInfo.processInfo.environment["PORT"] {
    server.serverPort = UInt16(portString)!
}

// Register dependency injection
addIoC()

// Register filters
addFilters()

// Register routes and handlers
let routes = routesAndHandlers()
for r in routes {
    serverSecure.addRoutes(r)
    server.addRoutes(r)
}

// Setup database
do {
    try setupDatabase()
} catch StORMError.error(let msg) {
    print("Database error thrown: \(msg)")
}

// Start servers
Threading.dispatch { try? server.start() }

do {
    try serverSecure.start()
} catch PerfectNetError.networkError(let msg) {
    print("Network error thrown: \(msg)")
} catch {
    print("System error thrown: \(error)")
}
