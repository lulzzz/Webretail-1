//
//  SocialAuthentication.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import Foundation
import PerfectLib
import PerfectHTTP
import Turnstile
import TurnstileCrypto
import TurnstileWeb

public class AuthenticationController {

    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .post, uri: "/api/login", handler: loginHandlerPOST)
        routes.add(method: .post, uri: "/api/login/consumer", handler: consumerHandlerPOST)
		routes.add(method: .post, uri: "/api/logout", handler: logoutHandlerPOST)
		routes.add(method: .post, uri: "/api/register", handler: registerHandlerPOST)
        routes.add(method: .get, uri: "/api/authenticated", handler: authenticatedHandlerGET)

        routes.add(method: .get, uri: "/login/facebook", handler: facebookHandler)
        routes.add(method: .get, uri: "/login/facebook/consumer", handler: facebookHandlerConsumer)
        
        routes.add(method: .get, uri: "/login/google", handler: googleHandler)
        routes.add(method: .get, uri: "/login/google/consumer", handler: googleHandlerConsumer)

        return routes
    }

    func authenticatedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")

        var resp = [String: Any]()
        resp["authenticated"] = false
        do {
            if request.user.authenticated {
                guard let uniqueID = request.user.authDetails?.account.uniqueID else {
                    throw AccountTakenError()
                }
                let user = User()
                try user.get(uniqueID)
                
                resp["authenticated"] = true
                resp["uniqueID"] = request.user.authDetails?.account.uniqueID
                resp["role"] = user.isAdmin ? "Admin" : "User"
            }
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }
    
    func loginHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        var resp = [String: String]()
        guard let username = request.param(name: "username"),
            let password = request.param(name: "password") else {
                resp["error"] = "Missing username or password"
                do {
                    try response.setBody(json: resp)
                } catch {
                    print(error)
                }
                response.completed()
                return
        }
        let credentials = UsernamePassword(username: username, password: password)
        
        do {
            try request.user.login(credentials: credentials, persist: true)
            guard let uniqueID = request.user.authDetails?.account.uniqueID else {
                throw AccountTakenError()
            }
			let token = tokenStore.new(uniqueID)
            let user = User()
            try user.get(uniqueID)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
            resp["role"] = user.isAdmin ? "Admin" : "User"
        } catch {
            resp["error"] = "Invalid username or password"
        }
        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }

	func logoutHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		var resp = [String: String]()
		do {
			request.user.logout()
			if let auth = request.header(.authorization)?.replacingOccurrences(of: "Bearer ", with: "") {
				pturnstile.turnstile.sessionManager.destroySession(identifier: auth)
			}
			resp["error"] = "none"
			resp["logout"] = "completed"

			try response.setBody(json: resp)
		} catch {
			print(error)
		}
		response.completed()
	}

	func registerHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        var resp = [String: String]()
	
        guard let username = request.param(name: "username"),
            let password = request.param(name: "password") else {
                resp["error"] = "Missing username or password"
                do {
                    try response.setBody(json: resp)
                } catch {
                    print(error)
                }
                response.completed()
                return
        }
        let credentials = UsernamePassword(username: username, password: password)
        
        do {
            try request.user.register(credentials: credentials)
            try request.user.login(credentials: credentials, persist: true)
            
            let uniqueID = request.user.authDetails?.account.uniqueID ?? ""
            let token = tokenStore.new(uniqueID)
            let user = User()
            try user.get(uniqueID)
            
            //register
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
            resp["role"] = user.isAdmin ? "Admin" : "User"
        } catch let e as TurnstileError {
            resp["error"] = e.description
        } catch {
            resp["error"] = "An unknown error occurred."
        }
        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }

    
    /* Facebook Signin */
    
    func facebookHandler(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let state = URandom().secureToken
        let redirectURL = facebook.getLoginLink(redirectURL: "http://" + host + "/login/facebook/consumer", state: state)
        
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.relativeSeconds(3600), path: "/", secure: nil, httpOnly: true))
        response.redirect(path: redirectURL.absoluteString)
    }
    
    func facebookHandlerConsumer(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        var resp = [String: String]()
        
        guard let state = request.cookies.filter({$0.0 == "OAuthState"}).first?.1 else {
            resp["error"] = "unknown error"
            do {
                try response.setBody(json: resp)
            } catch {
                print(error)
            }
            response.completed()
            return
        }
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.absoluteSeconds(0), path: "/", secure: nil, httpOnly: true))
        let uri = "http://" + host + request.uri
        
        do {
            let credentials = try facebook.authenticate(authorizationCodeCallbackURL: uri, state: state) as! FacebookAccount
            //try request.user.login(credentials: credentials, persist: true)
            response.redirect(path: "/?consumer=facebook&uniqueID=\(credentials.uniqueID)")
        } catch let error {
            let description = (error as? TurnstileError)?.description ?? "Unknown Error"
            resp["error"] = description
            do {
                try response.setBody(json: resp)
            } catch {
                print(error)
            }
            response.completed()
        }
    }
    
    /* Google Signin */
    
    func googleHandler(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        let state = URandom().secureToken
        let redirectURL = google.getLoginLink(redirectURL: "http://" + host + "/login/google/consumer", state: state)
        
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: nil, path: "/", secure: nil, httpOnly: true))
        response.redirect(path: redirectURL.absoluteString)
    }
    
    func googleHandlerConsumer(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        var resp = [String: String]()
        
        guard let state = request.cookies.filter({$0.0 == "OAuthState"}).first?.1 else {
            return
        }
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.absoluteSeconds(0), path: "/", secure: nil, httpOnly: true))
        let uri = "http://" + host + request.uri
        
        do {
            let credentials = try google.authenticate(authorizationCodeCallbackURL: uri, state: state) as! GoogleAccount
            //try request.user.login(credentials: credentials, persist: true)
            response.redirect(path: "/?consumer=google&uniqueID=\(credentials.uniqueID)")
        } catch let error {
            let description = (error as? TurnstileError)?.description ?? "Unknown Error"
            resp["error"] = description
            do {
                try response.setBody(json: resp)
            } catch {
                print(error)
            }
            response.completed()
        }
    }

    /* Angular2 Login action (POST) */
    
    func consumerHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        var resp = [String: String]()
        guard let consumer = request.param(name: "consumer"),
              let uniqueID = request.param(name: "uniqueID") else {
                resp["error"] = "Missing uniqueID"
                do {
                    try response.setBody(json: resp)
                } catch {
                    print(error)
                }
                response.completed()
                return
        }
        
        let credentials = ConsumerAccount(consumer: consumer, uniqueID: uniqueID)
        
        do {
            try request.user.login(credentials: credentials, persist: true)
            let uniqueID = request.user.authDetails?.account.uniqueID ?? ""
            let token = tokenStore.new(uniqueID)
            let user = User()
            try user.get(uniqueID)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
            resp["role"] = user.isAdmin ? "Admin" : "User"
        } catch {
            resp["error"] = "Invalid uniqueID"
        }
        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }
}
