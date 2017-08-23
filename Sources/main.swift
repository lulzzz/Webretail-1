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

import PerfectLib
import PerfectHTTP
import PerfectHTTPServer
import PerfectLogger
import Turnstile


// Used later in script for the Realm and how the user authenticates.
let pturnstile = TurnstilePerfectRealm(realm: CustomRealm())

// Create HTTP server.
let server = HTTPServer()

// Where to serve static files from
server.documentRoot = "./webroot"
// Host address and server port
server.serverPort   = 8181

// Setup database
try setupDatabase();

// Register dependency injection
addIoC()

// Register auth routes and handlers
addRoutesAndHandlers()

// Add routes to be checked for auth
addFilters()

// Error file location
LogFile.location = "./log.log"

do {
    // Launch the HTTP server.
    try server.start()
} catch PerfectError.networkError(let err, let msg) {
    print("Network error thrown: \(err) \(msg)")
}
