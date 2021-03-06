//
//  AccessTokenStore.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 26/02/17.
//
//

import Foundation
import StORM
import PerfectLogger
import SwiftRandom

/// Class for handling the tokens that are used for JSON API and Web authentication
class AccessTokenStore : PostgresSqlORM {
    
    /// The token itself.
    public var token: String = ""
    
    /// The userid relates to the Users object UniqueID
    public var userid: String = ""
    
    /// Integer relaing to the created date/time
    public var created: Int = 0
    
    /// Integer relaing to the last updated date/time
    public var updated: Int = 0
    
    /// Idle period specified when token was created
    public var idle: Int = 86400 // 86400 seconds = 1 day
    
    /// Table name used to store Tokens
    override open func table() -> String { return "tokens" }
    open override func tableIndexes() -> [String] { return ["token"] }
    
    /// Set incoming data from database to object
    open override func to(_ this: StORMRow) {
        if let val = this.data["token"]	{ token = val as! String }
        if let val = this.data["userid"] { userid = val as! String }
        if let val = this.data["created"] { created	= val as! Int }
        if let val = this.data["updated"] { updated = val as! Int }
        if let val = this.data["idle"] { idle = val as! Int}
    }
    
    /// Iterate through rows and set to object data
    func rows() -> [AccessTokenStore] {
        var rows = [AccessTokenStore]()
        for i in 0..<self.results.rows.count {
            let row = AccessTokenStore()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    /// Checks to see if the token is active
    /// Upticks the updated int to keep it alive.
    public func check() -> Bool? {
        if (updated + idle) < Int.now() { return false } else {
            do {
                updated = Int.now()
                try save()
            } catch {
                LogFile.error("\(error)")
            }
            return true
        }
    }
    
    /// Triggers creating a new token.
    public func new(_ u: String) -> String {
		do {
			token = ""
			try self.query(whereclause: "userid = $1",
						   params: [u],
						   cursor: StORMCursor(limit: 1, offset: 0))
			if token.isEmpty {
				let rand = URandom()
				token = rand.secureToken
				token = token.replacingOccurrences(of: "-", with: "a")
				userid = u
				created = Int.now()
				try create()
			} else {
				updated = Int.now()
				try save()
			}
        } catch {
            LogFile.info("\(error)")
        }
        return token
    }
    
//    /// Performs a find on supplied token
//    func get(token: String) {
//        do {
//            try self.query(whereclause: "token = $1", params: [token], cursor: StORMCursor(limit: 1, offset: 0))
//        } catch {
//            LogFile.error("\(error)")
//        }
//    }
}
