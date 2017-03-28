//
//  PostgresSqlORM.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/02/17.
//
//

import PerfectLib
import PerfectLogger
import PostgresStORM
import StORM

open class PostgresSqlORM: PostgresStORM {
    
    /// Get value from json object
    func getJSONValue<T: JSONConvertible>(named namd: String, from:[String:Any], defaultValue: T) -> T {
        let f = from[namd]
        if let v = f as? T {
            return v
        }
        else if defaultValue is Int, let d = f as? String {
            return Int(d) as! T
        }
        else if defaultValue is Double, let d = f as? String {
            return Double(d) as! T
        }
        else if defaultValue is Double, let d = f as? Int {
            return Double(d) as! T
        }
        
        return defaultValue
    }

    // Table unique indexes
    open func tableIndexes() -> [String] { return [String]() }

    /// Table Creation
    /// Requires the connection to be configured, as well as a valid "table" property to have been set in the class
    open override func setup(_ str: String = "") throws {
        LogFile.info("Running setup: \(table())", logFile: "./StORMlog.txt")
        var createStatement = str
        if str.characters.count == 0 {
            var opt = [String]()
            var keyName = ""
            for child in Mirror(reflecting: self).children {
                guard let key = child.label?.lowercased() else {
                    continue
                }
                var verbage = ""
                if !key.hasPrefix("internal_") && !key.hasPrefix("_") {
                    verbage = "\(key.lowercased()) "
                    if child.value is Int && opt.count == 0 {
                        verbage += "serial"
                    } else if child.value is Int {
                        verbage += "integer DEFAULT 0"
                        if key.hasSuffix("Id") {
                            var table = key.substring(to: key.index(key.endIndex, offsetBy: -2)) + "s"
                            if table.hasSuffix("ys") {
                                table = table.replacingOccurrences(of: "ys", with: "ies")
                            }
                            verbage += " REFERENCES \(table) ON DELETE CASCADE"
                        }
                    } else if child.value is Bool {
                        verbage += "boolean DEFAULT false"
                    } else if child.value is Character {
                        verbage += "char DEFAULT ' '"
                    } else if child.value is [String:Any] {
                        verbage += "jsonb"
                    } else if child.value is Double {
                        verbage += "double precision DEFAULT 0"
                    } else if child.value is UInt || child.value is UInt8 || child.value is UInt16 || child.value is UInt32 || child.value is UInt64 {
                        verbage += "bytea"
                    } else {
                        verbage += "text"
                    }
                    if opt.count == 0 {
                        verbage += " NOT NULL"
                        keyName = key
                    }
                    opt.append(verbage)
                }
            }
            let keyComponent = ", CONSTRAINT \(table())_key PRIMARY KEY (\(keyName)) NOT DEFERRABLE INITIALLY IMMEDIATE"
            createStatement = "CREATE TABLE IF NOT EXISTS \(table()) (\(opt.joined(separator: ", "))\(keyComponent));"
        }
        do {
            //if StORMdebug { LogFile.info("createStatement: \(createStatement)", logFile: "./StORMlog.txt") }
            try sql(createStatement, params: [])
            for key in tableIndexes() {
                let createIndex = "CREATE UNIQUE INDEX IF NOT EXISTS \(key)_idx ON \(table())(\( key ));"
                //if StORMdebug { LogFile.info("createIndex: \(createIndex)", logFile: "./StORMlog.txt") }
                try sql(createIndex, params: [])
            }
        } catch {
            LogFile.error("Error setup: \(error)", logFile: "./StORMlog.txt")
            throw StORMError.error("\(error)")
        }
    }
}
