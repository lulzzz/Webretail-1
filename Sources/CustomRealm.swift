//
//  CustomRealm.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 24/02/17.
//
//

import Foundation
import Turnstile
import TurnstileCrypto

/// The "Turnstile Realm" that holds the main routing functionality for request filters
open class CustomRealm : Realm {
    
    public var random: Random = URandom()

    /// Used when a "Credentials" onject is passed to the authenticate function. Returns an Account object.
    open func authenticate(credentials: Credentials) throws -> Account {
        
        switch credentials {
        case let credentials as UsernamePassword:
            return try authenticate(credentials: credentials)
        case let credentials as AccessToken:
            return try authenticate(credentials: credentials)
        case let credentials as ConsumerAccount:
            return try authenticate(credentials: credentials)
        default:
            throw UnsupportedCredentialsError()
        }
    }
    
    /// Used when an "AccessToken" onject is passed to the authenticate function. Returns an Account object.
    open func authenticate(credentials: AccessToken) throws -> Account {
        let account = User()
        let token = AccessTokenStore()
        //print(credentials.string)
        do {
            try token.get(credentials.string)
            if token.check() == false {
                throw IncorrectCredentialsError()
            }
            try account.get(token.userid)
			return account
        } catch {
            throw IncorrectCredentialsError()
        }
    }
    
    /// Used when a "UsernamePassword" onject is passed to the authenticate function. Returns an Account object.
    open func authenticate(credentials: UsernamePassword) throws -> Account {
        let account = User()
        do {
            let thisAccount = try account.get(credentials.username, credentials.password)
            return thisAccount
        } catch {
            throw IncorrectCredentialsError()
        }
    }
    
    private func authenticate(credentials: ConsumerAccount) throws -> Account {
        let account = User()
        try account.find([("\(credentials.consumer)ID", credentials.uniqueID)])
        if !account.uniqueID.isEmpty {
            return account
        } else {
            return try register(credentials: credentials)
        }
    }
    
    /// Registers PasswordCredentials against the AuthRealm.
    open func register(credentials: Credentials) throws -> Account {
        
        let account = User()
        let newAccount = User()
        newAccount.id(String(random.secureToken))
        
        switch credentials {
        case let credentials as UsernamePassword:
            do {
                if account.exists(credentials.username) {
                    throw AccountTakenError()
                }
                newAccount.username = credentials.username
                newAccount.password = credentials.password
            } catch {
                throw AccountTakenError()
            }
        case let credentials as ConsumerAccount:
            try account.find([("\(credentials.consumer)ID", credentials.uniqueID)])
            guard account.uniqueID.isEmpty else {
                throw AccountTakenError()
            }
            newAccount.username = credentials.consumer
            if credentials.consumer == "facebook" {
                newAccount.facebookID = credentials.uniqueID
            }
            else {
                newAccount.googleID = credentials.uniqueID
            }
        default:
            throw UnsupportedCredentialsError()
        }
        
        newAccount.password = BCrypt.hash(password: newAccount.password)
        try newAccount.create() // can't use save as the id is populated
        
        return newAccount
    }
}

public struct ConsumerAccount: Account, Credentials {
    public let consumer: String
    public let uniqueID: String
}

