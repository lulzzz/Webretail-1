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

let pturnstile = TurnstilePerfectRealm()
let tokenStore = AccessTokenStore()
let ioCContainer = IoCContainer()

func setupDatabase() throws {
    
	PostgresConnector.port = 5432
    PostgresConnector.host = "localhost"
    PostgresConnector.username = "postgres"
    PostgresConnector.password = "postgres"
    PostgresConnector.database = "webretail"
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
	try Product().setup()
	try ProductCategory().setup()
	try ProductAttribute().setup()
	try ProductAttributeValue().setup()
	try Article().setup()
	try ArticleAttributeValue().setup()
	try Stock().setup()
	try Device().setup()
	try Customer().setup()
	try Invoice().setup()
	try Movement().setup()
	try MovementArticle().setup()
	try Discount().setup()
	try DiscountProduct().setup()
	try Publication().setup()
    try Basket().setup()
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
	ioCContainer.register { ProductRepository() as ProductProtocol }
	ioCContainer.register { ArticleRepository() as ArticleProtocol }
	ioCContainer.register { CustomerRepository() as CustomerProtocol }
	ioCContainer.register { MovementRepository() as MovementProtocol }
	ioCContainer.register { MovementArticleRepository() as MovementArticleProtocol }
	ioCContainer.register { DiscountRepository() as DiscountProtocol }
	ioCContainer.register { InvoiceRepository() as InvoiceProtocol }
    ioCContainer.register { StatisticRepository() as StatisticProtocol }
	ioCContainer.register { PublicationRepository() as PublicationProtocol }
    ioCContainer.register { EcommerceRepository() as EcommerceProtocol }
}

func addRoutesAndHandlers() {
	// Register Angular routes and handlers
	server.addRoutes(AngularController().getRoutes())
	
	// Register api routes and handlers
	server.addRoutes(CompanyController().getRoutes())
	server.addRoutes(AuthenticationController().getRoutes())
	server.addRoutes(UserController().getRoutes())
	server.addRoutes(CausalController().getRoutes())
	server.addRoutes(StoreController().getRoutes())
	server.addRoutes(DeviceController().getRoutes())
	server.addRoutes(BrandController().getRoutes())
	server.addRoutes(CategoryController().getRoutes())
	server.addRoutes(AttributeController().getRoutes())
	server.addRoutes(AttributeValueController().getRoutes())
	server.addRoutes(ProductController().getRoutes())
	server.addRoutes(ArticleController().getRoutes())
	server.addRoutes(CustomerController().getRoutes())
	server.addRoutes(MovementController().getRoutes())
	server.addRoutes(MovementArticleController().getRoutes())
	server.addRoutes(DiscountController().getRoutes())
	server.addRoutes(InvoiceController().getRoutes())
    server.addRoutes(PdfController().getRoutes())
    server.addRoutes(StatisticController().getRoutes())
    server.addRoutes(PublicationController().getRoutes())
    server.addRoutes(EcommerceController().getRoutes())
}

func addFilters() {
	var authenticationConfig = AuthenticationConfig()
	authenticationConfig.include("/api/*}")
    authenticationConfig.exclude("/api/login")
	authenticationConfig.exclude("/api/logout")
    authenticationConfig.exclude("/api/register")
    authenticationConfig.exclude("/api/ecommerce")
    authenticationConfig.exclude("/api/ecommerce/featured")
    authenticationConfig.exclude("/api/ecommerce/category")
    authenticationConfig.exclude("/api/ecommerce/category/*")
    authenticationConfig.exclude("/api/ecommerce/product/*")

	let authFilter = AuthFilter(authenticationConfig)
	
	// Note that order matters when the filters are of the same priority level
    server.setRequestFilters([pturnstile.requestFilter])
    server.setResponseFilters([pturnstile.responseFilter])
	server.setRequestFilters([(authFilter, .high)])
}
