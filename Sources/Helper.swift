//
//  Helper.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import PerfectLib

struct Helper {
    
    public static func now() -> Int {
        return Int(Date.timeIntervalSinceReferenceDate)
    }
    
    public static func formatDate(unixdate: Int) -> String {
        if unixdate == 0 { return "" }
        let date = Date(timeIntervalSinceReferenceDate: TimeInterval(unixdate))
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        formatter.timeZone = TimeZone.current
        
        return formatter.string(from: date)
    }

    public static func formatCurrency(value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.maximumFractionDigits = 2;
        formatter.locale = Locale.current
        let result = formatter.string(from: value as NSNumber);
        
        return result!
    }
    
    public static func roundCurrency(value: Double) -> Double {
        return (value * 100).rounded() / 100
    }

    public static func getJSONValue<T: JSONConvertible>(named namd: String, from:[String:Any], defaultValue: T) -> T {
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
    
        return defaultValue
    }
}
