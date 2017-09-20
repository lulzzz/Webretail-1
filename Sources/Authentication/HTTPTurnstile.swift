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
        //self.setHeader(.contentType, value: "text/html")
        self.appendBody(string: error)
        self.completed()
    }

    public func setJson<T>(_ json: T) throws where T:Codable {
        let encoder = JSONEncoder()
        let data = try! encoder.encode(json)
        //self.setHeader(.contentType, value: "application/json")
        self.appendBody(string: String(data: data, encoding: .utf8)!)
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

    public func getJson<T:Codable>() throws -> T {
        let decoder = JSONDecoder()
        let jsonData = self.postBodyString?.data(using: .utf8)!
        //LogFile.info(self.postBodyString!)
        return try! decoder.decode(T.self, from: jsonData!)
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
        let token = headerValue[range.upperBound...]
        //let token = headerValue.substring(from: range.upperBound)
        guard let separatorRange = token.range(of: "#") else {
			return nil
		}
        
		// Swift 4.0
        let apiKeyID = token[..<separatorRange.lowerBound]
        let apiKeySecret = token[separatorRange.upperBound...]
        return APIKey(id: String(apiKeyID), secret: String(apiKeySecret))
        // Swift 3.x
        //let apiKeyID = token.substring(to: separatorRange.lowerBound)
        //let apiKeySecret = token.substring(from: separatorRange.upperBound)
        //return APIKey(id: apiKeyID, secret: apiKeySecret)
    }
    
	/// Enables auth checking via a Bearer Token
    var bearer: AccessToken? {
        guard let range = headerValue.range(of: "Bearer ") else { return nil }
        
        // Swift 4.0
        let token = headerValue[range.upperBound...]
        return AccessToken(string: String(token))
        // Swift 3.x
        //let token = headerValue.substring(from: range.upperBound)
        //return AccessToken(string: token)
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