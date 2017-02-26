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
import PerfectRequestLogger
import PostgresStORM
import StORM
import Turnstile
import TurnstileWeb


StORMdebug = true
RequestLogFile.location = "./requests.log"

// Used later in script for the Realm and how the user authenticates.
let pturnstile = TurnstilePerfectRealm(realm: CustomRealm())

// Database connection
PostgresConnector.host        = "localhost"
//PostgresConnector.username    = "postgres"
//PostgresConnector.password    = "postgres"
PostgresConnector.database    = "webretail"
PostgresConnector.port        = 5432


// Connect the AccessTokenStore
let tokenStore = AccessTokenStore()
try? tokenStore.setup()


// Create HTTP server.
let server = HTTPServer()

// Register auth routes and handlers
var authenticationController = AuthenticationController()
server.addRoutes(authenticationController.getRoutes())

// Register api routes and handlers
let usertController = UserController(repository: UserRepository())
server.addRoutes(usertController.getRoutes())

let brandController = BrandController(repository: BrandRepository())
server.addRoutes(brandController.getRoutes())

let categoryController = CategoryController(repository: CategoryRepository())
server.addRoutes(categoryController.getRoutes())

let attributeController = AttributeController(repository: AttributeRepository())
server.addRoutes(attributeController.getRoutes())

let attributeValueController = AttributeValueController(repository: AttributeValueRepository())
server.addRoutes(attributeValueController.getRoutes())

let productController = ProductController(repository: ProductRepository())
server.addRoutes(productController.getRoutes())

let articleController = ArticleController(repository: ArticleRepository())
server.addRoutes(articleController.getRoutes())

let publicationController = PublicationController(repository: PublicationRepository())
server.addRoutes(publicationController.getRoutes())


// Setup logging
let myLogger = RequestLogger()

// add routes to be checked for auth
var authenticationConfig = AuthenticationConfig()
authenticationConfig.exclude("/api/login")
authenticationConfig.exclude("/api/login/consumer")
authenticationConfig.exclude("/api/register")
authenticationConfig.exclude("/api/authenticated")
authenticationConfig.include("/api/*}")


let authFilter = AuthFilter(authenticationConfig)

// Note that order matters when the filters are of the same priority level
server.setRequestFilters([pturnstile.requestFilter])
server.setResponseFilters([pturnstile.responseFilter])
server.setRequestFilters([(authFilter, .high)])
server.setRequestFilters([(myLogger, .high)])
server.setResponseFilters([(myLogger, .low)])

// Set a listen port of 8080
server.serverPort = 8080

// Where to serve static files from
server.documentRoot = "./wwwroot"

do {
    // Launch the HTTP server.
    try server.start()
} catch PerfectError.networkError(let err, let msg) {
    print("Network error thrown: \(err) \(msg)")
}
