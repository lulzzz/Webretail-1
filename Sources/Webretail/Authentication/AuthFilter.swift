//
//  AuthFilter.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import PerfectHTTP
import SwiftString

/// Contains the filtering mechanism for determining valid authentication on routes.
public struct AuthFilter: HTTPRequestFilter {

	/// The authentication configuration. Holds the routes to be included or excluded
	var authenticationConfig = AuthenticationConfig()

	/// Accept an auth config via init.
	public init(_ cfg: AuthenticationConfig) {
		authenticationConfig = cfg
	}

	/// Perform the filtering, with a callback allowing continuation of request, or galting immediately.
	public func filter(request: HTTPRequest, response: HTTPResponse, callback: (HTTPRequestFilterResult) -> ()) {

        //		guard let denied = authenticationConfig.denied else {
		//			callback(.continue(request, response))
		//			return
		//		}

		var checkAuth = false
        let isUser = request.user.authDetails?.account is User
        let wildcardInclusions = authenticationConfig.inclusions.filter({$0.contains("*")})
		let wildcardExclusions = authenticationConfig.exclusions.filter({$0.contains("*")})

		// check if specifically in inclusions
		if authenticationConfig.inclusions.contains(request.path) { checkAuth = true }
		// check if covered by a wildcard
		for wInc in wildcardInclusions {
			if request.path.startsWith(wInc.split("*")[0]) { checkAuth = true }
		}

		// ignore check if sepecified in exclusions
		if authenticationConfig.exclusions.contains(request.path) { checkAuth = false }
		// check if covered by a wildcard
		for wInc in wildcardExclusions {
			if request.path.startsWith(wInc.split("*")[0]) { checkAuth = false }
		}

		if checkAuth && request.user.authenticated && (isUser || request.path.contains(string: "ecommerce")) {
            callback(.continue(request, response))
            return
		} else if checkAuth {
			response.status = .unauthorized
			callback(.halt(request, response))
			return
		}
        
        callback(.continue(request, response))
	}
}
