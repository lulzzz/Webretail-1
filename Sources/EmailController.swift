//
//  EmailController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 12/04/17.
//
//

import PerfectHTTP
import PerfectSMTP

class EmailController {
	
	private let repository: CompanyProtocol
	
	init() {
		self.repository = ioCContainer.resolve() as CompanyProtocol
	}

	func getRoutes() -> Routes {
		var routes = Routes()
		routes.add(method: .post, uri: "/api/email", handler: emailHandlerPOST)

		return routes
	}
	
	
	func emailHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")
		
		do {
			let json = try request.postBodyString?.jsonDecode() as? [String:Any]
			let item = Email()
			item.setJSONValues(json!)

			let company = try self.repository.get()!
			let url = "\(company.smtpSsl ? "smtps" : "smtp")://\(company.smtpHost)"
			let client = SMTPClient(url: url, username: company.smtpUsername, password: company.smtpPassword)
			let email = EMail(client: client)
			
			email.to.append(Recipient(address: item.address))
			email.from = Recipient(address: company.companyEmail)
			email.subject = item.subject
			email.content = item.content
			
			try email.send() { code, header, body in
				
				if code != 0 {
					print(header)
					response.badRequest(error: "\(request.uri) \(request.method): \(header)")
					return
				}
				
				do {
					item.content = "Email successfully sent"
					try response.setBody(json: item)
					response.completed(status: .accepted)
				} catch {
					print(error)
				}
			}
		} catch {
			response.badRequest(error: "\(request.uri) \(request.method): \(error)")
		}
	}
}