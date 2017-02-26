//
//  TurnstilePerfectRealm.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import Turnstile
import TurnstileWeb
import PerfectHTTP

public class TurnstilePerfectRealm {
    public var requestFilter: (HTTPRequestFilter, HTTPFilterPriority)
    public var responseFilter: (HTTPResponseFilter, HTTPFilterPriority)
    
    private let turnstile: Turnstile
    
    public init(sessionManager: SessionManager = PerfectSessionManager(), realm: Realm = CustomRealm()) {
        turnstile = Turnstile(sessionManager: sessionManager, realm: realm)
        let filter = TurnstileFilter(turnstile: turnstile)
        
        requestFilter = (filter, HTTPFilterPriority.high)
        responseFilter = (filter, HTTPFilterPriority.high)
    }
}
