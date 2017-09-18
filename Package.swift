// swift-tools-version:4.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Webretail",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
        .package(url: "https://github.com/iamjono/SwiftString.git", from: "2.0.3"),
        .package(url: "https://github.com/iamjono/SwiftRandom.git", from: "0.2.5"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-PostgreSQL.git", from: "2.0.2"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-HTTP.git", from: "2.2.4"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-HTTPServer.git", from: "2.3.4"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-COpenSSL.git", from: "2.0.6"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-libcurl.git", from: "2.0.6"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-SMTP.git", from: "1.1.7"),
        
        .package(url: "https://github.com/PerfectlySoft/PerfectLib.git", from: "2.0.11"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-CURL.git", from: "2.1.7"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-Thread.git", from: "2.0.12"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-XML.git", from: "2.0.5"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-Crypto.git", from: "1.1.1"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-Net.git", from: "2.1.18"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-libxml2.git", from: "2.0.1"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-libpq.git", from: "2.0.1"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-Logger.git", from: "1.1.0"),
        .package(url: "https://github.com/iamjono/SwiftMoment.git", from: "0.9.1"),
        .package(url: "https://github.com/SwiftORM/StORM.git", from: "1.3.0"),
        .package(url: "https://github.com/SwiftORM/Postgres-StORM.git", from: "1.4.0"),
        .package(url: "https://github.com/stormpath/Turnstile.git", from: "1.0.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages which this package depends on.
        .target(
            name: "Webretail",
            dependencies: [
                "StORM",
                "PostgresStORM",
                "COpenSSL",
                "PerfectLogger",
                "SwiftRandom",
                "SwiftString",
                "Turnstile",
                "PerfectSMTP",
                "PerfectHTTPServer",
            ],
            path: ".",
            sources: ["Sources"]),
        ]
)


