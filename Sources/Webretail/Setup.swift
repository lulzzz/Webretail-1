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
import PerfectSession


let pturnstile = TurnstilePerfectRealm()
let tokenStore = AccessTokenStore()
let ioCContainer = IoCContainer()
let sessionDriver = SessionMemoryDriver()

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

func getRoutesAndHandlers() -> Routes {
    var routes = Routes()
    
	// Register Angular routes and handlers
	routes.add(AngularController().getRoutes())
	
	// Register api routes and handlers
	routes.add(CompanyController().getRoutes())
	routes.add(AuthenticationController().getRoutes())
	routes.add(UserController().getRoutes())
	routes.add(CausalController().getRoutes())
	routes.add(StoreController().getRoutes())
	routes.add(DeviceController().getRoutes())
	routes.add(BrandController().getRoutes())
	routes.add(CategoryController().getRoutes())
	routes.add(AttributeController().getRoutes())
	routes.add(AttributeValueController().getRoutes())
	routes.add(ProductController().getRoutes())
	routes.add(ArticleController().getRoutes())
	routes.add(CustomerController().getRoutes())
	routes.add(MovementController().getRoutes())
	routes.add(MovementArticleController().getRoutes())
	routes.add(DiscountController().getRoutes())
	routes.add(InvoiceController().getRoutes())
    routes.add(PdfController().getRoutes())
    routes.add(StatisticController().getRoutes())
    routes.add(PublicationController().getRoutes())
    routes.add(EcommerceController().getRoutes())
    
    return routes
}

func getResponseFilters() -> [(HTTPResponseFilter, HTTPFilterPriority)] {
	
	// Note that order matters when the filters are of the same priority level
    return [sessionDriver.responseFilter, pturnstile.responseFilter]
}

func getRequestFilters() -> [(HTTPRequestFilter, HTTPFilterPriority)] {
    var authenticationConfig = AuthenticationConfig()
    authenticationConfig.include("/api/*}")
    authenticationConfig.exclude("/api/login")
    authenticationConfig.exclude("/api/logout")
    authenticationConfig.exclude("/api/register")
    authenticationConfig.exclude("/api/ecommerce")
    authenticationConfig.exclude("/api/ecommerce/featured")
    authenticationConfig.exclude("/api/ecommerce/category")
    authenticationConfig.exclude("/api/ecommerce/category/*")
    
    let authFilter = AuthFilter(authenticationConfig)

    return [sessionDriver.requestFilter, (authFilter, .high), pturnstile.requestFilter]
}

