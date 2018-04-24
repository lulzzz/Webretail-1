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
//let cert = (sslCert: "certificate.crt", sslKey: "private.pem")
//let alpn: [HTTPServer.ALPNSupport] = [.http11, .http2]

// Create HTTP server.
let server = HTTPServer()
server.serverName = "webretail.herokuapp.com"
server.documentRoot = "./webroot"
//server.ssl = cert
//server.alpnSupport = alpn
server.serverPort = 8181
if let portString = ProcessInfo.processInfo.environment["PORT"] {
    server.serverPort = UInt16(portString)!
}

// Register dependency injection
addIoC()

// Register filters
addFilters()

do {
    // Setup database
    try setupDatabase()

    // Register routes and handlers
    addRoutesAndHandlers()

    // Launch the WebApi server.
    try server.start()

} catch StORMError.error(let msg) {
    print("Database error thrown: \(msg)")
} catch PerfectNetError.networkError(let msg) {
    print("Network error thrown: \(msg)")
} catch {
    print("System error thrown: \(error)")
}
