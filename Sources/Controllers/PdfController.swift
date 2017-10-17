//
//  BarcodeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 03/06/17.
//
//

import Foundation
import PerfectHTTP
import PerfectLogger
import PerfectSMTP
import PerfectLib

#if os(OSX)
    import Quartz
#endif

class PdfController {
    
    private let movementRepository: MovementArticleProtocol
    private let repository: CompanyProtocol
    
    init() {
        self.repository = ioCContainer.resolve() as CompanyProtocol
        self.movementRepository = ioCContainer.resolve() as MovementArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()

        routes.add(method: .post, uri: "/api/pdf", handler: pdfHandlerPOST)
        routes.add(method: .post, uri: "/api/pdf/email", handler: emailHandlerPOST)
//        routes.add(method: .get, uri: "/api/pdf/movement/{id}", handler: PdfMovementHandlerGET)
//        routes.add(method: .get, uri: "/api/pdf/invoice{id}", handler: PdfInvoiceHandlerGET)
        routes.add(method: .get, uri: "/api/pdf/barcode/{id}", handler: barcodeHandlerGET)
        
        return routes
    }
    
    func pdfHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            let item: Message = try request.getJson()
            
            let data = self.htmlToPdf(model: item);
            guard let content = data else {
                throw PerfectError.apiError("phantomjs error")
            }
            
            response.appendBody(bytes: [UInt8](content))
            response.setHeader(.contentType, value: "application/pdf")
            response.completed()
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func emailHandlerPOST(request: HTTPRequest, _ response: HTTPResponse) {
        response.setHeader(.contentType, value: "application/json")
        
        do {
            let item: Message = try request.getJson()
            if item.address.isEmpty {
                throw PerfectError.apiError("email address to is empty")
            }
            
            let company = try self.repository.get()!
            if company.companyEmail.isEmpty {
                throw PerfectError.apiError("email address from is empty")
            }
            
            let data = self.htmlToPdf(model: item);
            if data == nil {
                throw PerfectError.apiError("phantomjs error")
            }

            let url = "\(company.smtpSsl ? "smtps" : "smtp")://\(company.smtpHost)"
            let client = SMTPClient(url: url, username: company.smtpUsername, password: company.smtpPassword)
            let email = EMail(client: client)
            
            email.to.append(Recipient(address: item.address))
            email.from = Recipient(address: company.companyEmail)
            email.subject = item.subject
            email.content = item.content
            email.attachments = ["/tmp/\(item.subject)"]
            
            try email.send() { code, header, body in
                
                if code != 0 {
                    response.badRequest(error: "\(request.uri) \(request.method): \(header)")
                    return
                }
                
                do {
                    item.content = "Email successfully sent"
                    try response.setJson(item)
                    response.completed(status: .accepted)
                } catch {
                    print(error)
                }
            }
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func htmlToPdf(model: Message) -> Data? {
        let path = "/tmp/\(model.subject)";
        
        try? FileManager.default.removeItem(atPath: path)
        
        let result = self.execCommand(
            command: "/usr/local/bin/phantomjs",
            args: [
                "rasterize.js",
                model.content,
                path,
                "28cm*38.5cm"
            ])
        
        if !result.isEmpty {
            LogFile.error(result);
            return nil;
        }

        return FileManager.default.contents(atPath: path)!
    }

    func execCommand(command: String, args: [String]) -> String {
        if !command.hasPrefix("/") {
            let commandFull = execCommand(command: "/usr/bin/which", args: [command]).trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
            return execCommand(command: commandFull, args: args)
        } else {
            let proc = Process()
            proc.launchPath = command
            proc.arguments = args
            let pipe = Pipe()
            proc.standardOutput = pipe
            proc.launch()
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            return String(data: data, encoding: String.Encoding.utf8)!
        }
    }
    
    func barcodeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            #if os(Linux)
                throw PerfectError.apiError("barcode is not available on linux")
            #else
                let id = request.urlVariables["id"]!
                let items = try self.movementRepository.get(movementId: Int(id)!)
                
                let document = PDFDocument()
                
                for item in items {
                    for _ in 0..<Int(item.movementArticleQuantity) {
                        
                        var values = [Int:String]()
                        for attribute in item.movementArticleProduct._attributes {
                            for attributeValue in attribute._attributeValues {
                                let value = attributeValue._attributeValue
                                values.updateValue(value.attributeValueName, forKey: value.attributeValueId)
                            }
                        }
                        
                        var product = "\(item.movementArticleProduct.productName) - "
                        for article in item.movementArticleProduct._articles {
                            for attributeValue in article._attributeValues {
                                let value = values[attributeValue.attributeValueId]
                                product.append("\(value!) ")
                            }
                        }
                        
                        let page = BarcodePDFPage(
                            title: product,
                            price: item.movementArticlePrice.formatCurrency(),
                            barcode: item.movementArticleBarcode
                        )
                        document.insert(page, at: 0)
                    }
                }
                
                let bytes = [UInt8](document.dataRepresentation()!)
                response.setBody(bytes: bytes)
                response.setHeader(.contentType, value: "application/pdf")
                response.completed()
            #endif
        } catch {
            response.setHeader(.contentType, value: "application/json")
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
