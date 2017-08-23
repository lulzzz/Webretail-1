//
//  HTTPTurnstile.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import PerfectHTTP
import PerfectLogger
import Turnstile
import Foundation

extension HTTPResponse {
    /// Extends the HTTPRequest with redirect.
    public func redirect(path: String) {
        self.status = .found
        self.addHeader(.location, value: path)
        self.completed()
    }
    
    public func badRequest(error: String) {
		LogFile.error(error)
		self.status = .badRequest
        self.appendBody(string: error)
       self.completed()
    }
}

public extension HTTPRequest {
	/// Extends the HTTPRequest with a user object.
    internal(set) public var user: Subject {
        get {
            return scratchPad["TurnstileSubject"] as! Subject
        }
        set {
            scratchPad["TurnstileSubject"] = newValue
        }
    }
}

/// Container for an auth header object
struct AuthorizationHeader {
    let headerValue: String
    
    init?(value: String?) {
        guard let value = value else { return nil }
        headerValue = value
    }

	/// Enables auth checking via an API Key
    var basic: APIKey? {
        guard let range = headerValue.range(of: "Basic ") else { return nil }
        let token = headerValue.substring(from: range.upperBound)
		guard let separatorRange = token.range(of: ":") else {
			return nil
		}
		
        let apiKeyID = token.substring(to: separatorRange.lowerBound)
        let apiKeySecret = token.substring(from: separatorRange.upperBound)
        
        return APIKey(id: apiKeyID, secret: apiKeySecret)
    }
    
	/// Enables auth checking via a Bearer Token
    var bearer: AccessToken? {
        guard let range = headerValue.range(of: "Bearer ") else { return nil }
        let token = headerValue.substring(from: range.upperBound)
        return AccessToken(string: token)
    }
}


extension HTTPRequest {
	/// Extends the HTTPrequest object with an auth vriable.
    var auth: AuthorizationHeader? {
        return AuthorizationHeader(value: self.header(.authorization))
    }
}

extension HTTPRequest {
	/// Extends the HTTPReques object with a Cookie retrieval method
    func getCookie(name: String) -> String? {
        for (cookieName, payload) in self.cookies {
            if name == cookieName {
                return payload
            }
        }
        return nil
    }
}
