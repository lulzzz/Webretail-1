// swift-tools-version:4.0
// Generated automatically by Perfect Assistant 2
// Date: 2018-01-08 21:24:16 +0000
import PackageDescription

let package = Package(
	name: "Webretail",
	dependencies: [
		.package(url: "https://github.com/iamjono/SwiftString.git", .exact("2.0.4")),
		.package(url: "https://github.com/iamjono/SwiftRandom.git", .exact("0.2.5")),
		.package(url: "https://github.com/stormpath/Turnstile.git", .exact("1.0.6")),
		.package(url: "https://github.com/SwiftORM/Postgres-StORM.git", .exact("3.0.1")),
		//.package(url: "https://github.com/PerfectlySoft/Perfect-HTTP.git", .exact("3.0.3")),
		.package(url: "https://github.com/PerfectlySoft/Perfect-HTTPServer.git", .exact("3.0.3")),
		.package(url: "https://github.com/PerfectlySoft/Perfect-SMTP.git", .exact("3.1.1")),
		.package(url: "https://github.com/twostraws/SwiftGD.git", .exact("2.0.1")),
        	.package(url: "https://github.com/gerardogrisolini/mwsWebretail.git", .exact("1.0.5"))
	],
	targets: [
		.target(name: "Webretail", dependencies: ["SwiftString", "SwiftRandom", "PerfectHTTPServer", "PostgresStORM", "Turnstile", "PerfectSMTP", "SwiftGD", "mwsWebretail"])
	]
)
