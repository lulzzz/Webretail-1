//
//  SessionConfig.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import PerfectHTTP

/// Configuration parameters for the session
public struct SessionConfig {

    /// CORS Config
    public static var CORS: CORSconfig = CORSconfig()

    public struct CORSconfig {

		public init(){}

		/// Enabled: default, false
		public var enabled = false

		/// Array of acceptable hostnames for incoming requets
		/// To enable CORS on all, have a single entry, *
		/// If a match with the origin is found, the origin is echoed back the client in the response
		/// NOTE: If .enabled = true, but this is empty, then CORS will not be generated and therefore will be denied.
		public var acceptableHostnames = [String]()

		/// Array of acceptable methods
		public var methods: [HTTPMethod] = [.get]

		/// An array of headers allowed
		public var allowHeaders = [String]()

		/// Access-Control-Allow-Credentials true/false.
		/// Standard CORS requests do not send or set any cookies by default.
		/// In order to include cookies as part of the request enable the client to do so by setting to true
		public var withCredentials = false

		/// Max Age (seconds) of request / OPTION caching.
		/// Set to 0 for no caching
		public var maxAge = 0
	}
}
