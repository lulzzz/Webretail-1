//
//  Extensions.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import Foundation
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
		let formatter = DateFormatter()
		formatter.dateFormat = self.length > 10 ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : "yyyy-MM-dd"
		formatter.timeZone = TimeZone(abbreviation: "UTC")
		let date = formatter.date(from: self)!
		
		return Int(date.timeIntervalSinceReferenceDate)
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
