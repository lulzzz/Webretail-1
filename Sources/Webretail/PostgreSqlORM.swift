//
//  PostgresSqlORM.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 21/02/17.
//
//

import Foundation
import PerfectLogger
import PostgresStORM
import StORM

open class PostgresSqlORM: PostgresStORM {
    
//    /// Get value from json object
//    func getJSONValue<T: JSONConvertible>(named namd: String, from:[String:Any], defaultValue: T) -> T {
//        let f = from[namd]
//        if let v = f as? T {
//            return v
//        }
//        else if defaultValue is Int, let d = f as? String {
//            return Int(d) as! T
//        }
//        else if defaultValue is Double, let d = f as? String {
//            return Double(d) as! T
//        }
//        else if defaultValue is Double, let d = f as? Int {
//            return Double(d) as! T
//        }
//
//        return defaultValue
//    }

    // Table unique indexes
    open func tableIndexes() -> [String] { return [String]() }

    /// Table Creation
    /// Requires the connection to be configured, as well as a valid "table" property to have been set in the class
    open override func setup(_ str: String = "") throws {
        LogFile.info("Running setup: \(table())")
        var createStatement = str
        if str.length == 0 {
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
                            var table = String(key[..<key.index(key.endIndex, offsetBy: -2)] + "s")
                            //var table = key.substring(to: key.index(key.endIndex, offsetBy: -2)) + "s"
                            if table.hasSuffix("ys") {
                                table = table.replacingOccurrences(of: "ys", with: "ies")
                            }
                            verbage += " REFERENCES \(table) ON DELETE CASCADE"
                        }
                    } else if child.value is Bool {
                        verbage += "boolean DEFAULT false"
                    } else if child.value is Character {
                        verbage += "char DEFAULT ' '"
                    } else if child.value is String {
                        verbage += key.contains(string: "xml") ? "xml" : "text"
                    } else if child.value is Double {
                        verbage += "double precision DEFAULT 0"
                    } else if child.value is UInt || child.value is UInt8 || child.value is UInt16 || child.value is UInt32 || child.value is UInt64 {
                        verbage += "text" //"bytea"
                    } else {
                        verbage += "jsonb"
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
            LogFile.error("setup: \(error)")
            throw StORMError.error("\(error)")
        }
    }

	public func query(id: Any) throws {
		let (idname, _) = firstAsKey()
		do {
			try query(whereclause: "\(idname.lowercased()) = $1", params: [id])
		} catch {
			LogFile.error("query: \(error)")
			throw error
		}
	}
	
	public func query(
		columns:		[String] = [],
		whereclause:	String = "",
		params:			[Any] = [],
		orderby:		[String] = [],
		cursor:			StORMCursor = StORMCursor(limit: 10000,offset: 0),
		joins:			[StORMDataSourceJoin] = [],
		having:			[String] = [],
		groupBy:		[String] = []
		) throws {
		
		var clauseSelect = ""
		var clauseWhere = ""
		var clauseOrder = ""
		var clauseJoin = ""

        var keys = [String]()
        keys.append(self.table() + ".*")
        for join in joins {
            keys.append(join.table + ".*")
            clauseJoin += " \(join.direction) JOIN \(join.table) ON \(join.onCondition)"
        }

        if columns.count > 0 {
			clauseSelect = columns.joined(separator: ",")
		} else {
            clauseSelect = keys.joined(separator: ",")
		}

		if whereclause.length > 0 {
			clauseWhere = "WHERE \(whereclause)"
		}
		
		var paramsString = [String]()
		for i in 0..<params.count {
			paramsString.append(String(describing: params[i]))
		}
		if orderby.count > 0 {
			let colsjoined = orderby.joined(separator: ",")
			clauseOrder = "ORDER BY \(colsjoined)"
		}
		do {
			// SELECT ASSEMBLE
			var str = "SELECT \(clauseSelect.lowercased()) FROM \(table())\(clauseJoin) \(clauseWhere) \(clauseOrder)"

			// TODO: Add having, groupby
			
			if cursor.limit > 0 {
				str += " LIMIT \(cursor.limit)"
			}
			if cursor.offset > 0 {
				str += " OFFSET \(cursor.offset)"
			}
			
			// save results into ResultSet
			results.rows = try self.sqlRows(str, params: paramsString)
			
			// if just one row returned, act like a "GET"
			if results.rows.count == 1 { makeRow() }
			
			//return results
		} catch {
			LogFile.error("query: \(error)")
			self.error = StORMError.error("\(error)")
			throw error
		}
	}

    /// Returns a [(String,Any)] object representation of the current object.
    /// If any object property begins with an underscore, or with "internal_" it is omitted from the response.
    private func asDataQuery(_ offset: Int = 0) -> [(String, Any)] {
        var c = [(String, Any)]()
        do {
            var count = 0
            let mirror = Mirror(reflecting: self)
            for case let (label?, value) in mirror.children {
                if count >= offset && !label.hasPrefix("internal_") && !label.hasPrefix("_") {
                    if value is StORM || value is [JsonbProtocol] || value is JsonbProtocol {
                        let encoder = JSONEncoder()
                        let data: Data
                        switch value {
                        case is Store:
                            data = try encoder.encode(value as! Store)
                            break
                        case is Causal:
                            data = try encoder.encode(value as! Causal)
                            break
                        case is Registry:
                            data = try encoder.encode(value as! Registry)
                            break
                        case is Product:
                            data = try encoder.encode(value as! Product)
                            break
                        case is [Barcode]:
                            data = try encoder.encode(value as? [Barcode])
                            break
                        case is Media:
                            data = try encoder.encode(value as? Media)
                            break
                        case is [Media]:
                            data = try encoder.encode(value as? [Media])
                            break
                        case is [Tag]:
                            data = try encoder.encode(value as? [Tag])
                            break
                        case is Tax:
                            data = try encoder.encode(value as? Tax)
                            break
                        case is Price:
                            data = try encoder.encode(value as? Price)
                            break
                        case is Packaging:
                            data = try encoder.encode(value as? Packaging)
                            break
                        case is Discount:
                            data = try encoder.encode(value as? Discount)
                            break
                        case is Seo:
                            data = try encoder.encode(value as? Seo)
                            break
                        default:
                            data = try encoder.encode(value as? [Translation])
                            break
                        }
                        c.append((label, modifyValue(String(data: data, encoding: .utf8)!, forKey: label)))
                    } else if value is [String] {
                        c.append((label, modifyValue((value as! [String]).joined(separator: ","), forKey: label)))
                    } else {
                        c.append((label, modifyValue(value, forKey: label)))
                    }
                }
                count += 1
            }
        } catch {
            LogFile.error("asDataQuery: \(error)")
        }
        return c
    }

    /// Standard "Save" function.
    /// Designed as "open" so it can be overriden and customized.
    /// If an ID has been defined, save() will perform an updae, otherwise a new document is created.
    /// On error can throw a StORMError error.
    
    override open func save() throws {
        do {
            if keyIsEmpty() {
                try insert(asDataQuery(1))
            } else {
                let (idname, idval) = firstAsKey()
                try update(data: asDataQuery(1), idName: idname, idValue: idval)
            }
        } catch {
            LogFile.error("save: \(error)")
            throw StORMError.error("\(error)")
        }
    }
    
    /// Alternate "Save" function.
    /// This save method will use the supplied "set" to assign or otherwise process the returned id.
    /// Designed as "open" so it can be overriden and customized.
    /// If an ID has been defined, save() will perform an updae, otherwise a new document is created.
    /// On error can throw a StORMError error.
    
    override open func save(set: (_ id: Any)->Void) throws {
        do {
            if keyIsEmpty() {
                let setId = try insert(asDataQuery(1))
                set(setId)
            } else {
                let (idname, idval) = firstAsKey()
                try update(data: asDataQuery(1), idName: idname, idValue: idval)
            }
        } catch {
            LogFile.error("save: \(error)")
            throw StORMError.error("\(error)")
        }
    }

    override open func create() throws {
        try insert(asDataQuery())
    }
}
