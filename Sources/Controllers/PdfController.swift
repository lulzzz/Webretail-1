//
//  BarcodeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 03/06/17.
//
//

import Foundation
import PerfectHTTP
#if os(OSX)
    import Quartz
#else
    import PerfectLib
#endif

class PdfController {
    
    private let movementRepository: MovementArticleProtocol
    
    init() {
        self.movementRepository = ioCContainer.resolve() as MovementArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()

        //routes.add(method: .get, uri: "/api/pdf", handler: htmlToPdfHandlerGET)
        routes.add(method: .get, uri: "/api/pdf/barcode/{id}", handler: barcodeHandlerGET)
        
        return routes
    }
    
    /*
    func htmlToPdfHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        try? FileManager.default.removeItem(atPath: "/tmp/page.pdf")
        
        let result = self.execCommand(
            command: "/usr/local/bin/wkhtmltopdf",
            args: [
                "http://www.tessilnova.com",
                "/tmp/page.pdf"
            ])
        
        if !result.isEmpty {
            response.badRequest(error: result)
            return
        }
        
        let content = FileManager.default.contents(atPath: "/tmp/page.pdf")!
        response.appendBody(bytes: [UInt8](content))
        response.setHeader(.contentType, value: "application/pdf")
        response.completed()
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
    */
    
    func barcodeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            #if os(Linux)
                throw PerfectError.apiError("Barcode is not available on linux")
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
                response.completed(status: .ok)
            #endif
        } catch {
            response.setHeader(.contentType, value: "application/json")
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}
