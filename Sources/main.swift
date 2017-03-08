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
import PerfectRequestLogger
import PostgresStORM
import StORM
import Turnstile
import TurnstileWeb


StORMdebug = true
LogFile.location = "./error.log"
RequestLogFile.location = "./requests.log"

// Used later in script for the Realm and how the user authenticates.
let pturnstile = TurnstilePerfectRealm(realm: CustomRealm())

// Database connection
PostgresConnector.host        = "192.168.1.44"
PostgresConnector.username    = "gerardo"
PostgresConnector.password    = "gerardo"
PostgresConnector.database    = "webretail"
PostgresConnector.port        = 5432


// Connect the AccessTokenStore
let tokenStore = AccessTokenStore()
try? tokenStore.setup()

// Register dependency injection
let ioCContainer = IoCContainer()
ioCContainer.register { UserRepository() as UserProtocol }
ioCContainer.register { CausalRepository() as CausalProtocol }
ioCContainer.register { StoreRepository() as StoreProtocol }
ioCContainer.register { BrandRepository() as BrandProtocol }
ioCContainer.register { CategoryRepository() as CategoryProtocol }
ioCContainer.register { AttributeRepository() as AttributeProtocol }
ioCContainer.register { AttributeValueRepository() as AttributeValueProtocol }
ioCContainer.register { ProductRepository() as ProductProtocol }
ioCContainer.register { ArticleRepository() as ArticleProtocol }
ioCContainer.register { MovementRepository() as MovementProtocol }
ioCContainer.register { MovementArticleRepository() as MovementArticleProtocol }
ioCContainer.register { PublicationRepository() as PublicationProtocol }


// Create HTTP server.
let server = HTTPServer()

// Register auth routes and handlers
server.addRoutes(AuthenticationController().getRoutes())

// Register api routes and handlers
server.addRoutes(UserController().getRoutes())
server.addRoutes(CausalController().getRoutes())
server.addRoutes(StoreController().getRoutes())
server.addRoutes(BrandController().getRoutes())
server.addRoutes(CategoryController().getRoutes())
server.addRoutes(AttributeController().getRoutes())
server.addRoutes(AttributeValueController().getRoutes())
server.addRoutes(ProductController().getRoutes())
server.addRoutes(ArticleController().getRoutes())
server.addRoutes(MovementController().getRoutes())
server.addRoutes(MovementArticleController().getRoutes())
server.addRoutes(PublicationController().getRoutes())

// Register Angular routes and handlers
server.addRoutes(AngularController().getRoutes())


// Add routes to be checked for auth
var authenticationConfig = AuthenticationConfig()
authenticationConfig.exclude("/api/login")
authenticationConfig.exclude("/api/login/consumer")
authenticationConfig.exclude("/api/register")
authenticationConfig.exclude("/api/authenticated")
authenticationConfig.include("/api/*}")
let authFilter = AuthFilter(authenticationConfig)

// Setup logging
let myLogger = RequestLogger()

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
