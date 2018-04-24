// swift-tools-version:4.1

import PackageDescription

let package = Package(
	name: "Webretail",
	dependencies: [
		.package(url: "https://github.com/iamjono/SwiftString.git", .exact("2.0.4")),
		.package(url: "https://github.com/iamjono/SwiftRandom.git", .exact("1.0.0")),
		.package(url: "https://github.com/stormpath/Turnstile.git", .exact("1.0.6")),
		.package(url: "https://github.com/SwiftORM/Postgres-StORM.git", .exact("3.1.0")),
		.package(url: "https://github.com/PerfectlySoft/Perfect-HTTPServer.git", .exact("3.0.14")),
		.package(url: "https://github.com/PerfectlySoft/Perfect-SMTP.git", .exact("3.2.1")),
		.package(url: "https://github.com/twostraws/SwiftGD.git", .exact("2.1.1")),
	        .package(url: "https://github.com/gerardogrisolini/mwsWebretail.git", .exact("1.1.3"))
	],
	targets: [
		.target(
            name: "Webretail",
            dependencies: [
                "SwiftString",
                "SwiftRandom",
                "PerfectHTTPServer",
                "PostgresStORM",
                "Turnstile",
                "PerfectSMTP",
                "SwiftGD",
                "mwsWebretail"
            ]
        )
	]
)
