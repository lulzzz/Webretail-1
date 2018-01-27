//
//  Extensions.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
import PerfectHTTP
import PerfectHTTPServer
import SwiftRandom
//#if os(OSX)
//    import Quartz
//#endif

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
        if self.isEmpty {
            return 0
        }
        
		let formatter = DateFormatter()
		formatter.dateFormat = self.length > 10 ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : "yyyy-MM-dd"
		formatter.timeZone = TimeZone(abbreviation: "UTC")
		let date = formatter.date(from: self)!
		
		return Int(date.timeIntervalSinceReferenceDate)
	}
    
    func permalink() -> String {
        let data = self
            .stringByReplacing(string: " ", withString: "-")
            .stringByReplacing(string: "/", withString: "_")
            .lowercased()
        return data
    }
    
    func uniqueName() -> String {
        let extensionPosition = self.lastIndexRaw(of: ".")!
        let stripExtension = String(self[extensionPosition...])
        return URandom().secureToken + stripExtension
    }

//    #if os(OSX)
//    func toBarcode() -> NSImage? {
//        let data = self.data(using: String.Encoding.ascii)
//
//        if let filter = CIFilter(name: "CICode128BarcodeGenerator") {
//            filter.setValue(data, forKey: "inputMessage")
//            let transform = CGAffineTransform(scaleX: 4, y: 5)
//
//            if let output = filter.outputImage?.transformed(by: transform) {
//                let rep = NSCIImageRep(ciImage: output)
//                let nsImage = NSImage(size: rep.size)
//                //let nsImage = NSImage(size: NSSize(width: self.collectionView.bounds.width - 40, height: 100.0))
//                nsImage.addRepresentation(rep)
//
//                return nsImage
//            }
//        }
//        return nil
//    }
//    #endif
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

extension Array where Element: Comparable {
    func containsSameElements(as other: [Element]) -> Bool {
        return self.count == other.count && self.sorted() == other.sorted()
    }
}

extension Array where Element: Equatable {
    mutating func remove(object: Element) {
        if let index = index(of: object) {
            remove(at: index)
        }
    }
}

extension HTTPHandler {
    public static func angularHandler(webapi: Bool = true) -> RequestHandler {
        return {
            req, resp in
            resp.setHeader(.contentType, value: "text/html")
            
            let data = FileManager.default.contents(atPath: webapi ? "./webroot/index.html" : "./WebUI/dist/index.html")
            
            guard let content = data else {
                resp.completed(status: .notFound)
                return
            }
            
            resp.appendBody(string: String(data: content, encoding: .utf8)!)
            resp.completed()
        }
    }
}


//#if os(OSX)
//class BarcodePDFPage: PDFPage {
//
//    let pdfWidth: CGFloat
//    let pdfHeight: CGFloat
//    let title: NSString
//    let price: NSString
//    let barcode: NSString
//
//    init(title: String = "", price: String = "", barcode: String = "")
//    {
//        self.title = title as NSString
//        self.price = price as NSString
//        self.barcode = " \(barcode) " as NSString
//
//        let image = barcode.toBarcode()!
//        self.pdfWidth = image.size.width
//        self.pdfHeight = image.size.height
//        super.init(image: image)!
//    }
//
//    func drawText()
//    {
//        let titleParagraphStyle = NSMutableParagraphStyle()
//        titleParagraphStyle.alignment = NSTextAlignment.left
//        let titleFontAttributes = [
//            NSAttributedStringKey.font: NSFont.labelFont(ofSize: 20),
//            NSAttributedStringKey.paragraphStyle: titleParagraphStyle,
//            NSAttributedStringKey.foregroundColor: NSColor.black
//        ]
//        let titleRect = NSMakeRect(CGFloat(26), pdfHeight - 40, pdfWidth - 150, 30)
//        self.title.draw(in: titleRect, withAttributes: titleFontAttributes)
//
//        let priceParagraphStyle = NSMutableParagraphStyle()
//        priceParagraphStyle.alignment = NSTextAlignment.right
//        let priceFontAttributes = [
//            NSAttributedStringKey.font: NSFont.labelFont(ofSize: 24),
//            NSAttributedStringKey.paragraphStyle: titleParagraphStyle,
//            NSAttributedStringKey.foregroundColor: NSColor.black
//        ]
//        let priceRect = NSMakeRect(pdfWidth - 124, pdfHeight - 36, 100, 30)
//        self.price.draw(in: priceRect, withAttributes: priceFontAttributes)
//
//        let barcodeParagraphStyle = NSMutableParagraphStyle()
//        barcodeParagraphStyle.alignment = NSTextAlignment.center
//        let barcodeFontAttributes = [
//            NSAttributedStringKey.font: NSFont.labelFont(ofSize: 26),
//            NSAttributedStringKey.paragraphStyle: barcodeParagraphStyle,
//            NSAttributedStringKey.foregroundColor: NSColor.black,
//            NSAttributedStringKey.backgroundColor: NSColor.white
//        ]
//        let barcodeRect = NSMakeRect(CGFloat(0), CGFloat(5), pdfWidth, 40)
//        self.barcode.draw(in: barcodeRect, withAttributes: barcodeFontAttributes)
//    }
//
//    @available(OSX 10.12, *)
//    override func draw(with box: PDFDisplayBox, to context: CGContext) {
//        super.draw(with: box, to: context)
//        self.drawText()
//    }
//
//    override func draw(with box: PDFDisplayBox) {
//        super.draw(with: box)
//        self.drawText()
//    }
//}
//#endif


extension Product {
    
    func toMWS() -> String {
        
        let soapMessage = """
        <?xml version="1.0" encoding="iso-8859-1"?>
        <AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
        <Header>
        <DocumentVersion>1.01</DocumentVersion>
        <MerchantIdentifier>M_EXAMPLE_123456</MerchantIdentifier>
        </Header>
        <MessageType>Product</MessageType>
        <PurgeAndReplace>false</PurgeAndReplace>
        <Message>
        <MessageID>1</MessageID>
        <OperationType>Update</OperationType>
        <Product>
        <SKU>56789</SKU>
        <StandardProductID>
        <Type>ASIN</Type>
        <Value>B0EXAMPLEG</Value>
        </StandardProductID>
        <ProductTaxCode>A_GEN_NOTAX</ProductTaxCode>
        <DescriptionData>
        <Title>Example Product Title</Title>
        <Brand>Example Product Brand</Brand>
        <Description>This is an example product description.</Description>
        <BulletPoint>Example Bullet Point 1</BulletPoint>
        <BulletPoint>Example Bullet Point 2</BulletPoint>
        <MSRP currency="USD">25.19</MSRP>
        <Manufacturer>Example Product Manufacturer</Manufacturer>
        <ItemType>example-item-type</ItemType>
        </DescriptionData>
        <ProductData>
        <Health>
        <ProductType>
        <HealthMisc>
        <Ingredients>Example Ingredients</Ingredients>
        <Directions>Example Directions</Directions>
        </HealthMisc>
        </ProductType>
        </Health>
        </ProductData>
        </Product>
        </Message>
        </AmazonEnvelope>
        """
        
        return soapMessage
    }
}
