//
//  Helper.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation

struct Helper {
    
    public static func now() -> Int {
        return Int(Date.timeIntervalSinceReferenceDate)
    }
    
    public static func formatDate(unixdate: Int) -> String {
        if unixdate == 0 { return "" }
        let date = Date(timeIntervalSinceReferenceDate: TimeInterval(unixdate))
        let formatter = DateFormatter()
        formatter.dateFormat = "YYYY-MM-dd hh:mm:ss"
        formatter.timeZone = TimeZone.current
        
        return formatter.string(from: date)
    }

    public static func formatCurrency(value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.maximumFractionDigits = 2;
        formatter.locale = Locale.current
        let result = formatter.string(from: value as NSNumber);
        return result!;
    }
    
    public static func roundCurrency(value: Double) -> Double {
        return (value * 100).rounded() / 100
    }
}
