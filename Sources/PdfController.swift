//
//  BarcodeController.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 03/06/17.
//
//

import Foundation
//import Quartz
import PerfectHTTP

class PdfController {
    
    private let movementRepository: MovementArticleProtocol
    
    init() {
        self.movementRepository = ioCContainer.resolve() as MovementArticleProtocol
    }
    
    func getRoutes() -> Routes {
        var routes = Routes()
        routes.add(method: .get, uri: "/api/pdf/barcode/{id}", handler: barcodeHandlerGET)
        return routes
    }

	func barcodeHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
		response.setHeader(.contentType, value: "application/json")

        /*
        do {
            let id = r.params.first!.1
            let items = try self.movementRepository.get(movementId: Int(id)!)
            
            let document = PDFDocument()

            for item in items {
                for _ in 0..<Int(item.movementArticleQuantity) {
                    
                    var values = [Int:String]()
                    for attribute in item.movementArticleProduct["attributes"] as! [NSDictionary] {
                        for attributeValue in attribute["attributeValues"] as! [NSDictionary] {
                            let value = attributeValue["attributeValue"] as! NSDictionary
                            values.updateValue(value["attributeValueName"] as! String, forKey: value["attributeValueId"] as! Int)
                        }
                    }
                    
                    var product = "\(item.movementArticleProduct["productName"] as! String) - "
                    for article in item.movementArticleProduct["articles"] as! [NSDictionary] {
                        for attributeValue in article["attributeValues"] as! [NSDictionary] {
                            let value = values[attributeValue["attributeValueId"] as! Int]
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
            
            let data = document.dataRepresentation()! as NSData
            var buffer = [UInt8](repeating: 0, count: data.length)
            data.getBytes(&buffer, length: data.length)

            return .raw(200, "OK", ["Content-Type": "application/pdf"], { writer in
                try? writer.write(buffer)
            })
        } catch {
            return .badRequest(.json("\(r.path) \(r.method): \(error)"))
        }
        */
    }
}
