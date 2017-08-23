//
//  Extensions.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation

extension Int {
    
    static func now() -> Int {
        return Int(Date.timeIntervalSinceReferenceDate)
    }
	
	func formatDateShort() -> String {
		return formatDate(format: "yyyy-MM-dd")
	}
	
    func formatDate(format: String = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") -> String {
        if self == 0 { return "" }
        let date = Date(timeIntervalSinceReferenceDate: TimeInterval(self))
        let formatter = DateFormatter()
        formatter.dateFormat = format
		formatter.timeZone = TimeZone(abbreviation: "UTC")
		return formatter.string(from: date)
    }
}

extension Date {
    func formatDate(format: String = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = format
        formatter.timeZone = TimeZone(abbreviation: "UTC")
        return formatter.string(from: self)
    }
}

extension Double {
    func roundCurrency() -> Double {
        return (self * 100).rounded() / 100
    }

    func formatCurrency() -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.maximumFractionDigits = 2;
        formatter.locale = Locale.current
        let result = formatter.string(from: NSNumber(value: self))
        
        return result!
    }
}

extension String {
	func DateToInt() -> Int {
		let formatter = DateFormatter()
		formatter.dateFormat = self.characters.count > 10 ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : "yyyy-MM-dd"
		formatter.timeZone = TimeZone(abbreviation: "UTC")
		let date = formatter.date(from: self)!
		
		return Int(date.timeIntervalSinceReferenceDate)
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

extension Sequence where Iterator.Element: Hashable {
    func unique() -> [Iterator.Element] {
        var alreadyAdded = Set<Iterator.Element>()
        return self.filter { alreadyAdded.insert($0).inserted }
    }
}

// extension HttpRequest {
//     public func parseJsonBody() -> [String: Any] {
//         guard let contentTypeHeader = headers["content-type"] else {
//             return ["": ""]
//         }
//         let contentTypeHeaderTokens = contentTypeHeader.components(separatedBy: ";").map { $0.trimmingCharacters(in: .whitespaces) }
//         guard let contentType = contentTypeHeaderTokens.first, contentType == "application/json" else {
//             return ["": ""]
//         }
//         guard let utf8String = String(bytes: body, encoding: .utf8) else {
//             // Consider to throw an exception here (examine the encoding from headers).
//             return ["": ""]
//         }
//         return try! utf8String.jsonDecode() as! [String: Any]
//     }
// }
 
