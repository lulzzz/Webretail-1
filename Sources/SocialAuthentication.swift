//
//  SocialAuthentication.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import PerfectHTTP
import TurnstileWeb
import TurnstileCrypto

let facebook = Facebook(clientID: "1232307486877468", clientSecret: "b852db2dd51e4a9cca80afe812c33a11")
let google = Google(clientID: "807060073548-m603cvhbmk5e8c633p333hflge1fi8mt.apps.googleusercontent.com", clientSecret: "_qcb-5fEEfDekInFe106Fhhl")

func makeSocialAuthenticationRoutes() -> Routes {

    var routes = Routes()
    
    routes.add(method: .get, uri: "/login/facebook") { request, response in
        let state = URandom().secureToken // This is using the TurnstileCrypto random token generator.
        let redirectURL = facebook.getLoginLink(redirectURL: "http://localhost:8080/login/facebook/consumer", state: state)
        
        response.status = .found
        response.setHeader(HTTPResponseHeader.Name.location, value: redirectURL.absoluteString)
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.relativeSeconds(3600), path: "/", secure: nil, httpOnly: true))
        response.completed()
    }
    
    routes.add(method: .get, uri: "/login/facebook/consumer") { request, response in
        // Check that the state matches the cookie.
        guard let state = request.cookies.filter({$0.0 == "OAuthState"}).first?.1 else {
            // Render error page
            return
        }
        // Expire the "state" token.
        response.addCookie(HTTPCookie(name: "OAuthState", value: state, domain: nil, expires: HTTPCookie.Expiration.absoluteSeconds(0), path: "/", secure: nil, httpOnly: true))
        
        let uri = "http://localhost:8080" + request.uri
        
        do {
            let credentials = try facebook.authenticate(authorizationCodeCallbackURL: uri, state: state) as! FacebookAccount
            print(credentials)
            
            // Use the credentials to login.
            try request.user.login(credentials: credentials, persist: true)
            
            response.status = .found
            response.addHeader(.location, value: "/")
            response.completed()
        } catch let error {
            // Render error page
            print(error)
        }
    }
    
    routes.add(method: .get, uri: "/login/google") { request, response in
        response.completed()
    }
    
    routes.add(method: .get, uri: "/login/google/consumer") { request, response in
        response.completed()
    }
    
    return routes
}
