//
//  Setup.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import Foundation
import PostgresStORM
import StORM
import TurnstileWeb
import PerfectHTTP

let pturnstile = TurnstilePerfectRealm()
let tokenStore = AccessTokenStore()
let ioCContainer = IoCContainer()

func setupDatabase() throws {
    
    PostgresConnector.host = "localhost"
    PostgresConnector.username = "postgres"
    PostgresConnector.password = "zBnwEe8QDR"
    PostgresConnector.database = "webretail"
    PostgresConnector.port = 5432
    StORMdebug = false

	try Company().setup()
	try tokenStore.setup()
	let user = User()
	try user.setup()
	try user.setAdmin()
	
	try Causal().setup()
	try Store().setup()
	try Brand().setup()
	try Category().setup()
	try Attribute().setup()
	try AttributeValue().setup()
    try TagGroup().setup()
    try TagValue().setup()
	try Product().setup()
	try ProductCategory().setup()
	try ProductAttribute().setup()
	try ProductAttributeValue().setup()
	try Article().setup()
	try ArticleAttributeValue().setup()
	try Stock().setup()
	try Device().setup()
	try Registry().setup()
	try Invoice().setup()
	try Movement().setup()
	try MovementArticle().setup()
	try Publication().setup()
    try Basket().setup()
    try MwsRequest().setup()
}

func addIoC() {
	ioCContainer.register { CompanyRepository() as CompanyProtocol }
	ioCContainer.register { UserRepository() as UserProtocol }
	ioCContainer.register { CausalRepository() as CausalProtocol }
	ioCContainer.register { StoreRepository() as StoreProtocol }
	ioCContainer.register { DeviceRepository() as DeviceProtocol }
	ioCContainer.register { BrandRepository() as BrandProtocol }
	ioCContainer.register { CategoryRepository() as CategoryProtocol }
	ioCContainer.register { AttributeRepository() as AttributeProtocol }
	ioCContainer.register { AttributeValueRepository() as AttributeValueProtocol }
    ioCContainer.register { TagGroupRepository() as TagGroupProtocol }
    ioCContainer.register { TagValueRepository() as TagValueProtocol }
	ioCContainer.register { ProductRepository() as ProductProtocol }
	ioCContainer.register { ArticleRepository() as ArticleProtocol }
	ioCContainer.register { RegistryRepository() as RegistryProtocol }
	ioCContainer.register { MovementRepository() as MovementProtocol }
	ioCContainer.register { MovementArticleRepository() as MovementArticleProtocol }
	ioCContainer.register { InvoiceRepository() as InvoiceProtocol }
    ioCContainer.register { StatisticRepository() as StatisticProtocol }
	ioCContainer.register { PublicationRepository() as PublicationProtocol }
    ioCContainer.register { EcommerceRepository() as EcommerceProtocol }
}

func routesAndHandlers() -> [Routes] {
    
    var routes = [Routes]()
    
	// Register Angular routes and handlers
	routes.append(AngularController().getRoutes())
	
	// Register api routes and handlers
	routes.append(CompanyController().getRoutes())
	routes.append(AuthenticationController().getRoutes())
	routes.append(UserController().getRoutes())
	routes.append(CausalController().getRoutes())
	routes.append(StoreController().getRoutes())
	routes.append(DeviceController().getRoutes())
	routes.append(BrandController().getRoutes())
	routes.append(CategoryController().getRoutes())
	routes.append(AttributeController().getRoutes())
	routes.append(AttributeValueController().getRoutes())
    routes.append(TagGroupController().getRoutes())
    routes.append(TagValueController().getRoutes())
	routes.append(ProductController().getRoutes())
	routes.append(ArticleController().getRoutes())
	routes.append(RegistryController().getRoutes())
	routes.append(MovementController().getRoutes())
	routes.append(MovementArticleController().getRoutes())
	routes.append(InvoiceController().getRoutes())
    routes.append(PdfController().getRoutes())
    routes.append(StatisticController().getRoutes())
    routes.append(PublicationController().getRoutes())
    routes.append(EcommerceController().getRoutes())
    routes.append(AmazonController().getRoutes())
    
    return routes
}

func addFilters() {
	var authenticationConfig = AuthenticationConfig()
	authenticationConfig.include("/api/*}")
    authenticationConfig.exclude("/api/login")
	authenticationConfig.exclude("/api/logout")
    authenticationConfig.exclude("/api/register")
    authenticationConfig.exclude("/api/ecommerce/*")
    authenticationConfig.exclude("/api/ecommerce/category/*")
    authenticationConfig.exclude("/api/ecommerce/brand/*")
    authenticationConfig.exclude("/api/ecommerce/product/*")
    authenticationConfig.exclude("/admin/*")
    authenticationConfig.exclude("/web/*")

	let authFilter = AuthFilter(authenticationConfig)
	
	// Note that order matters when the filters are of the same priority level
    server.setRequestFilters([pturnstile.requestFilter])
    server.setResponseFilters([pturnstile.responseFilter])
	server.setRequestFilters([(authFilter, .high)])

    serverSecure.setRequestFilters([pturnstile.requestFilter])
    serverSecure.setResponseFilters([pturnstile.responseFilter])
    serverSecure.setRequestFilters([(authFilter, .high)])
}
