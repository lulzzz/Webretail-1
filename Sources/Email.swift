//
//  Email.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 12/04/17.
//
//

import PerfectLib

class EmailMessage: JSONConvertible {
	
	public var address : String = ""
	public var subject : String = ""
	public var content : String = ""
	
	public func setJSONValues(_ values:[String:Any]) {
		self.address = values["address"] as? String ?? ""
		self.subject = values["subject"] as? String ?? ""
		self.content = values["content"] as? String ?? ""
	}
	
	func jsonEncodedString() throws -> String {
		return try self.getJSONValues().jsonEncodedString()
	}
	
	func getJSONValues() -> [String : Any] {
		return [
			"address": address,
			"subject": subject,
			"content": content
		]
	}
}
