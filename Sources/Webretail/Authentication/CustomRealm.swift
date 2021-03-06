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
import StORM

/// The "Turnstile Realm" that holds the main routing functionality for request filters
open class CustomRealm : Realm {

    public init() {}

    /// Used when a "Credentials" onject is passed to the authenticate function. Returns an Account object.
    open func authenticate(credentials: Credentials) throws -> Account {
        
        switch credentials {
        case let credentials as UsernamePassword:
            return try authenticate(credentials: credentials)
        case let credentials as AccessToken:
            return try authenticate(credentials: credentials)
		case let credentials as APIKey:
			return try authenticate(credentials: credentials)
        case let credentials as RegistryAccount:
            return try authenticate(credentials: credentials)
        default:
            throw UnsupportedCredentialsError()
        }
    }
    
    /// Used when an "AccessToken" onject is passed to the authenticate function. Returns an Account object.
    open func authenticate(credentials: AccessToken) throws -> Account {
		let token = AccessTokenStore()
		do {
			try token.get(credentials.string)
			if token.check() == false {
				throw IncorrectCredentialsError()
			}
//            if token.userid.contains(string: "@") {
            if token.userid.length < 10 {
                let registry = Registry()
                try registry.get(token.userid)
                return registry
            } else {
                let account = User()
                try account.get(token.userid)
                return account
            }
        } catch {
			throw IncorrectCredentialsError()
		}
    }
	
	/// Used when an "APIKey" onject is passed to the authenticate function. Returns an Account object.
	func authenticate(credentials: APIKey) throws -> Account {
		let device = Device()
		device.get(deviceToken: credentials.secret, deviceName: credentials.id)
		if device.deviceId == 0 {
			device.deviceToken = credentials.secret
			device.deviceName = credentials.id
			try device.save {
				id in device.deviceId = id as! Int
			}
		} else if device.storeId > 0 {
			let account = User()
			account.id(credentials.secret)
			account.username = credentials.id
			return account
		}
		throw IncorrectCredentialsError()
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
    
    /// Used when a "RegistryAccount" onject is passed to the authenticate function. Returns an Account object.
    private func authenticate(credentials: RegistryAccount) throws -> Account {
        let registry = Registry()
        do {
            let thisAccount = try registry.get(credentials.uniqueID, credentials.password)
            return thisAccount
        } catch {
            throw IncorrectCredentialsError()
        }
    }

	/// Registers PasswordCredentials against the AuthRealm.
    open func register(credentials: Credentials) throws -> Account {
        
        let account = Registry()
        let newAccount = Registry()
		
        switch credentials {
        case let credentials as RegistryAccount:
            do {
                if account.exists(credentials.uniqueID) {
                    throw AccountTakenError()
                }
                newAccount.registryEmail = credentials.uniqueID
                newAccount.registryPassword = credentials.password
            } catch {
                throw AccountTakenError()
            }
        default:
            throw UnsupportedCredentialsError()
        }
        
        newAccount.registryPassword = BCrypt.hash(password: newAccount.registryPassword)
        try newAccount.save {
            id in newAccount.registryId = id as! Int
        }

        return newAccount
    }
}

public struct RegistryAccount: Account, Credentials {
    public let uniqueID: String
    public let password: String
}

