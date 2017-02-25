//
//  SocialAuthentication.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import PerfectLib
import PerfectHTTP
import Turnstile
import TurnstileCrypto
import TurnstileWeb
import PerfectTurnstilePostgreSQL

/// The class that holds all the Social Authentication handlers
public class AuthHandlers {
    
    let facebook = Facebook(clientID: "1232307486877468", clientSecret: "b852db2dd51e4a9cca80afe812c33a11")
    let google = Google(clientID: "807060073548-m603cvhbmk5e8c633p333hflge1fi8mt.apps.googleusercontent.com", clientSecret: "_qcb-5fEEfDekInFe106Fhhl")

    
    public func makeAuthRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .post, uri: "/api/login", handler: loginHandlerPOST)
        routes.add(method: .post, uri: "/api/login/consumer", handler: consumerHandlerPOST)
        routes.add(method: .post, uri: "/api/register", handler: registerHandlerPOST)
        routes.add(method: .get,  uri: "/api/authenticated", handler: {
            request, response in
            response.setHeader(.contentType, value: "application/json")
            do {
                var resp = [String: Any]()
                
                resp["authenticated"] = request.user.authenticated
                resp["uniqueID"] = request.user.authDetails?.account.uniqueID

                try response.setBody(json: resp)
            } catch {
                print(error)
            }
            response.completed()
        })

        routes.add(method: .get, uri: "/login/facebook", handler: facebookHandler)
        routes.add(method: .get, uri: "/login/facebook/consumer", handler: facebookHandlerConsumer)
        
        routes.add(method: .get, uri: "/login/google", handler: googleHandler)
        routes.add(method: .get, uri: "/login/google/consumer", handler: googleHandlerConsumer)

        return routes
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
            try request.user.login(credentials: credentials)
            
            let token = tokenStore?.new((request.user.authDetails?.account.uniqueID)!)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
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
            
            try request.user.login(credentials: credentials)
            
            let token = tokenStore?.new((request.user.authDetails?.account.uniqueID)!)
            
            //register
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
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
        let redirectURL = facebook.getLoginLink(redirectURL: "http://localhost:8080/login/facebook/consumer", state: state)
        
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
        let uri = "http://localhost:8080" + request.uri
        
        do {
            let credentials = try facebook.authenticate(authorizationCodeCallbackURL: uri, state: state) as! FacebookAccount
            //try request.user.login(credentials: credentials, persist: true)
            response.redirect(path: "/?social=facebook&uniqueID=\(credentials.uniqueID)")
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
        let redirectURL = google.getLoginLink(redirectURL: "http://localhost:8080/login/google/consumer", state: state)
        
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: nil, path: "/", secure: nil, httpOnly: true))
        response.redirect(path: redirectURL.absoluteString)
    }
    
    func googleHandlerConsumer(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        var resp = [String: String]()
        
        guard let state = request.cookies.filter({$0.0 == "OAuthState"}).first?.1 else {
            response.render(template: "login", context: ["flash": "Unknown Error"])
            return
        }
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.absoluteSeconds(0), path: "/", secure: nil, httpOnly: true))
        let uri = "http://localhost:8080" + request.uri
        
        do {
            let credentials = try google.authenticate(authorizationCodeCallbackURL: uri, state: state) as! GoogleAccount
            //try request.user.login(credentials: credentials, persist: true)
            response.redirect(path: "/?social=google&uniqueID=\(credentials.uniqueID)")
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
        guard let social = request.param(name: "social"),
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
        
        let credentials = SocialAccount(social: social, uniqueID: uniqueID)
        
        do {
            try request.user.login(credentials: credentials, persist: true)
            let token = tokenStore?.new((request.user.authDetails?.account.uniqueID)!)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
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
