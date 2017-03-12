//
//  Extensions.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import PerfectLib

extension Int {
    
    static func now() -> Int {
        return Int(Date.timeIntervalSinceReferenceDate)
    }
    
    func formatDate(format: String = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") -> String {
        if self == 0 { return "" }
        let date = Date(timeIntervalSinceReferenceDate: TimeInterval(self))
        let formatter = DateFormatter()
        formatter.dateFormat = format
        formatter.timeZone = TimeZone.current
        
        return formatter.string(from: date)
    }
}

extension Double {
	func roundCurrency() -> Double {
		return (self * 100).rounded() / 100
	}

	/*
    func formatCurrency() -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.maximumFractionDigits = 2;
        formatter.locale = Locale.current
        let result = formatter.string(from: self as NSNumber);
        
        return result!
    }
    */
}

extension Sequence {
	func categorise<U : Hashable>(_ key: (Iterator.Element) -> U) -> [U:[Iterator.Element]] {
		var dict: [U:[Iterator.Element]] = [:]
		for el in self {
			let key = key(el)
			if case nil = dict[key]?.append(el) { dict[key] = [el] }
		}
		return dict
	}
}

extension Sequence {
	
	func groupBy<G: Hashable>(closure: (Iterator.Element)->G) -> [G: [Iterator.Element]] {
		var results = [G: Array<Iterator.Element>]()
		
		forEach {
			let key = closure($0)
			
			if var array = results[key] {
				array.append($0)
				results[key] = array
			}
			else {
				results[key] = [$0]
			}
		}
		
		return results
	}
}
