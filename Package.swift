// swift-tools-version:4.0
// The swift-tools-version declares the minimum version of Swift required to build this package.
import PackageDescription

let package = Package(
    name: "Webretail",
    products: [
        // Products define the executables and libraries produced by a package, and make them visible to other packages.
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
        .package(url: "https://github.com/iamjono/SwiftString.git", from: "2.0.3"),
        .package(url: "https://github.com/iamjono/SwiftRandom.git", from: "0.2.5"),
        .package(url: "https://github.com/stormpath/Turnstile.git", from: "1.0.0"),
        .package(url: "https://github.com/SwiftORM/Postgres-StORM.git", from: "3.0.1"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-HTTP.git", from: "3.0.1"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-HTTPServer.git", from: "3.0.3"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-SMTP.git", from: "3.0.1"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages which this package depends on.
        .target(
            name: "Webretail",
            dependencies: [
                "SwiftString",
                "SwiftRandom",
                "PerfectHTTPServer",
                "PostgresStORM",
                "Turnstile",
                "PerfectSMTP",
            ]
        ),
    ]
)
