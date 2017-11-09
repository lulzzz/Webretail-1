//
//  AuthenticationController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import PerfectHTTP
import PerfectLogger
import Turnstile

public class AuthenticationController {

    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .post, uri: "/api/login", handler: loginHandlerPOST)
        routes.add(method: .post, uri: "/api/logout", handler: logoutHandlerPOST)
        routes.add(method: .post, uri: "/api/register", handler: registerRegistryHandlerPOST)
        routes.add(method: .get,  uri: "/api/authenticated", handler: authenticatedHandlerGET)

        return routes
    }

    func loginHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        var resp = [String: String]()
        do {
            var credentials: Credentials
            
            if let login: LoginUser = request.getJson() {
                credentials = UsernamePassword(username: login.username, password: login.password)
            } else if let login: LoginRegistry = request.getJson() {
                credentials = RegistryAccount(uniqueID: login.email, password: login.password)
            } else {
                resp["error"] = "Missing username or password"
                try response.setBody(json: resp)
                response.completed()
                return
            }
            
            do {
                try request.user.login(credentials: credentials, persist: true)
                guard let uniqueID = request.user.authDetails?.account.uniqueID else {
                    throw AccountTakenError()
                }
                let token = tokenStore.new(uniqueID)
                resp["error"] = "none"
                resp["login"] = "ok"
                resp["token"] = token
                resp["uniqueID"] = uniqueID

                if (credentials is UsernamePassword) {
                    let user = User()
                    try user.get(uniqueID)
                    resp["role"] = user.isAdmin ? "Admin" : "User"
                    LogFile.info("Login user: \(user.username)")
                } else {
                    resp["role"] = "Registry"
                    LogFile.info("Login registry: \((credentials as! RegistryAccount).uniqueID)")
                }
            } catch {
                resp["error"] = "Invalid username or password"
            }
        } catch {
            resp["error"] = error.localizedDescription
        }

        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }
    
    func logoutHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		var resp = [String: String]()
        request.user.logout()
        if let auth = request.header(.authorization)?.replacingOccurrences(of: "Bearer ", with: "") {
            pturnstile.turnstile.sessionManager.destroySession(identifier: auth)
        }
        resp["error"] = "none"
        resp["logout"] = "completed"

        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
		response.completed()
	}

	func registerRegistryHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        var resp = [String: String]()
        do {
            guard let login: LoginRegistry = request.getJson() else {
                resp["error"] = "Missing email or password"
                try response.setBody(json: resp)
                response.completed()
                return
            }

            let credentials = RegistryAccount(uniqueID: login.email, password: login.password)

            try request.user.register(credentials: credentials)
            try request.user.login(credentials: credentials, persist: true)
            
            let uniqueID = request.user.authDetails?.account.uniqueID ?? "0"
            let token = tokenStore.new(uniqueID)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
			resp["uniqueID"] = uniqueID
            resp["role"] = "Registry"
        
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

    func authenticatedHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        var resp = [String: Any]()
        resp["authenticated"] = false
        do {
            if request.user.authenticated {
                guard let uniqueID = request.user.authDetails?.account.uniqueID else {
                    throw AccountTakenError()
                }
                
                resp["authenticated"] = true
                resp["uniqueID"] = request.user.authDetails?.account.uniqueID

                if (request.user.authDetails?.account is User) {
                    let user = User()
                    try user.get(uniqueID)
                    resp["role"] = user.isAdmin ? "Admin" : "User"
                } else {
                    resp["role"] = "Registry"
                }
            }
        } catch {
            resp["error"] = error.localizedDescription
        }

        do {
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }
}

