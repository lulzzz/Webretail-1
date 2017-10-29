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
import Turnstile
import StORM


// Create HTTP server.
let server = HTTPServer()
server.serverPort = 8181
server.documentRoot = "./webroot"

// Error file location
LogFile.location = "./StORMlog.txt"

// Register dependency injection
addIoC()

// Register routes and handlers
addRoutesAndHandlers()

// Register filters
addFilters()

do {
    // Setup database
    try setupDatabase();

    // Launch the HTTP server.
    try server.start()

} catch StORMError.error(let msg) {
    print("Database error thrown: \(msg)")
} catch PerfectNetError.networkError(let msg) {
    print("Network error thrown: \(msg)")
} catch {
    print("System error thrown: \(error)")
}
