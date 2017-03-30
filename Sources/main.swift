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
#if os(Linux)
server.serverPort 			= 80
let host 					= "ec2-35-157-208-60.eu-central-1.compute.amazonaws.com:\(server.serverPort)"
#else
server.serverPort 			= 8181
let host 					= "localhost:\(server.serverPort)"
#endif

// Setup database
try setupDatabase();

// Register dependency injection
addIoC()

// Register auth routes and handlers
addRoutesAndHandlers()

// Add routes to be checked for auth
addFilters()

// Error file location
LogFile.location = "./error.log"

do {
    // Launch the HTTP server.
    try server.start()
} catch PerfectError.networkError(let err, let msg) {
    print("Network error thrown: \(err) \(msg)")
}
