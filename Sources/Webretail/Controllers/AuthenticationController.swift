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
        routes.add(method: .post, uri: "/api/register", handler: registerCustomerHandlerPOST)
        routes.add(method: .get,  uri: "/api/authenticated", handler: authenticatedHandlerGET)

        return routes
    }

    func loginHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        var resp = [String: String]()
        do {
            var credentials: Credentials
            
            if let login: LoginUser = try request.getJson() {
                credentials = UsernamePassword(username: login.username, password: login.password)
            } else if let login: LoginCustomer = try request.getJson() {
                credentials = CustomerAccount(uniqueID: login.email, password: login.password)
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
                    LogFile.info("Logged in \(user.username)")
                } else {
                    resp["role"] = "Customer"
                    LogFile.info("Logged in \(uniqueID)")
                }
            } catch {
                resp["error"] = "Invalid username or password"
            }
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

	func registerCustomerHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        var resp = [String: String]()
        guard let email = request.param(name: "email"),
            let password = request.param(name: "password") else {
                resp["error"] = "Missing email or password"
                do {
                    try response.setBody(json: resp)
                } catch {
                    print(error)
                }
                response.completed()
                return
        }

        let credentials = CustomerAccount(uniqueID: email, password: password)
        
        do {
            try request.user.register(credentials: credentials)
            try request.user.login(credentials: credentials, persist: true)
            
            let uniqueID = request.user.authDetails?.account.uniqueID ?? ""
            let token = tokenStore.new(uniqueID)
            
            resp["error"] = "none"
            resp["login"] = "ok"
            resp["token"] = token
			resp["uniqueID"] = uniqueID
            resp["role"] = "Customer"
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
        response.setHeader(.contentType, value: "application/json")
        
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
                    resp["role"] = "Customer"
                }
            }
            try response.setBody(json: resp)
        } catch {
            print(error)
        }
        response.completed()
    }
}

