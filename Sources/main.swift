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
import PostgresStORM
import StORM
import Turnstile
import TurnstileWeb


StORMdebug = false
LogFile.location = "./error.log"

let facebook = Facebook(clientID: "1232307486877468", clientSecret: "b852db2dd51e4a9cca80afe812c33a11")
let google = Google(clientID: "807060073548-m603cvhbmk5e8c633p333hflge1fi8mt.apps.googleusercontent.com", clientSecret: "_qcb-5fEEfDekInFe106Fhhl")

// Used later in script for the Realm and how the user authenticates.
let pturnstile = TurnstilePerfectRealm(realm: CustomRealm())

// Create HTTP server.
let server = HTTPServer()
// Where to serve static files from
server.documentRoot = "./webroot"

// Database connection and host address
#if os(Linux)
let host 					= "ec2-35-157-208-60.eu-central-1.compute.amazonaws.com"
PostgresConnector.host		= "webretail.csb42stoatzh.eu-central-1.rds.amazonaws.com"
server.serverPort 			= 80
#else
let host 					= "localhost:8181"
PostgresConnector.host		= "localhost"
server.serverPort 			= 8181
#endif
PostgresConnector.username    = "webretail"
PostgresConnector.password    = "webretail"
PostgresConnector.database    = "webretail"
PostgresConnector.port        = 5432

// Setup database
try setupDatabase();

// Register dependency injection
addIoC()

// Register auth routes and handlers
addRoutesAndHandlers()

// Add routes to be checked for auth
addFilters()

do {
    // Launch the HTTP server.
    try server.start()
} catch PerfectError.networkError(let err, let msg) {
    print("Network error thrown: \(err) \(msg)")
}
