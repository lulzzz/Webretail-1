//
//  Setup.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 30/03/17.
//
//

import Foundation

let tokenStore = AccessTokenStore()
let ioCContainer = IoCContainer()

func setupDatabase() throws {
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
	try Customer().setup()
	try Movement().setup()
	try MovementArticle().setup()
	try Publication().setup()
}

func addIoC() {
	ioCContainer.register { UserRepository() as UserProtocol }
	ioCContainer.register { CausalRepository() as CausalProtocol }
	ioCContainer.register { StoreRepository() as StoreProtocol }
	ioCContainer.register { BrandRepository() as BrandProtocol }
	ioCContainer.register { CategoryRepository() as CategoryProtocol }
	ioCContainer.register { AttributeRepository() as AttributeProtocol }
	ioCContainer.register { AttributeValueRepository() as AttributeValueProtocol }
	ioCContainer.register { ProductRepository() as ProductProtocol }
	ioCContainer.register { ArticleRepository() as ArticleProtocol }
	ioCContainer.register { CustomerRepository() as CustomerProtocol }
	ioCContainer.register { MovementRepository() as MovementProtocol }
	ioCContainer.register { MovementArticleRepository() as MovementArticleProtocol }
	ioCContainer.register { PublicationRepository() as PublicationProtocol }
}

func addRoutesAndHandlers() {
	// Register Angular routes and handlers
	server.addRoutes(AngularController().getRoutes())
	
	// Register api routes and handlers
	server.addRoutes(AuthenticationController().getRoutes())
	server.addRoutes(UserController().getRoutes())
	server.addRoutes(CausalController().getRoutes())
	server.addRoutes(StoreController().getRoutes())
	server.addRoutes(BrandController().getRoutes())
	server.addRoutes(CategoryController().getRoutes())
	server.addRoutes(AttributeController().getRoutes())
	server.addRoutes(AttributeValueController().getRoutes())
	server.addRoutes(ProductController().getRoutes())
	server.addRoutes(ArticleController().getRoutes())
	server.addRoutes(CustomerController().getRoutes())
	server.addRoutes(MovementController().getRoutes())
	server.addRoutes(MovementArticleController().getRoutes())
	//server.addRoutes(PublicationController().getRoutes())
}

func addFilters() {
	var authenticationConfig = AuthenticationConfig()
	authenticationConfig.include("/api/*}")
	authenticationConfig.exclude("/api/login")
	authenticationConfig.exclude("/api/login/consumer")
	authenticationConfig.exclude("/api/register")
	authenticationConfig.exclude("/api/authenticated")
	authenticationConfig.exclude("/api/logout")
	let authFilter = AuthFilter(authenticationConfig)
	
	// Note that order matters when the filters are of the same priority level
	server.setRequestFilters([pturnstile.requestFilter])
	server.setResponseFilters([pturnstile.responseFilter])
	server.setRequestFilters([(authFilter, .high)])
}
