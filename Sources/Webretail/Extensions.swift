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
import mwsWebretail
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

    func checkdigit() -> String {
        if self.length != 12 {
            print("error the lenght must be 12 numbers")
        }
        
        var array = [1,3,1,3,1,3,1,3,1,3,1,3]
        var sum = 0
        for i in 0...11 {
            sum += Int("\(self[i])")! * array[i]
        }
        var count = 0
        while count < sum {
            count += 10
        }
        return "\(self)\(count - sum)"
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
            
            let data = FileManager.default.contents(atPath: webapi ? "./webroot/admin/index.html" : "./webroot/web/index.html")
            
            guard let content = data else {
                resp.completed(status: .notFound)
                return
            }
            
            resp.appendBody(string: String(data: content, encoding: .utf8)!)
            resp.completed()
        }
    }
}

extension Array where Element:Translation {
    func defaultValue() -> String {
        if let translation = self.first(where:{ $0.country == "EN" }) {
            return translation.value
        }
        if let translation = self.first {
            return translation.value
        }
        return ""
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

// Amazon MWS

extension Product {
    
    func productFeed() -> ProductFeed {
        
        var messages: [ProductMessage] = [ProductMessage]()
        
        let department = self._categories.first?._category.categoryName
        let material = self._attributes.first(where: { $0._attribute.attributeName == "Material" })?._attributeValues.first?._attributeValue.attributeValueName
        let colors = self._attributes.first(where: { $0._attribute.attributeName == "Color" })!._attributeValues
        let sizes = self._attributes.first(where: { $0._attribute.attributeName == "Size" })!._attributeValues
        var variationTheme: VariationTheme = .sizeColor
        if sizes.count == 0 { variationTheme = .color }
        if colors.count == 0 { variationTheme = .size }

        for article in self._articles {
            
            var sku = ""
            var title = ""
            var color: String?
            var size: String?
            var parentage: Parentage
            var standardProductID: StandardProductID?
            
            if article._attributeValues.count == 0 {
                parentage = .parent
                sku = self.productCode
                title = self.productName
            } else {
                parentage = .child
                sku = "\(self.productCode)-\(article.articleId)"
                
                guard let barcode = article.articleBarcodes
                    .first(where: { $0.tags.contains(where: { $0.valueName == "Amazon" }) })?
                    .barcode else {
                     continue
                }
                
                standardProductID = StandardProductID(type: .EAN, value: barcode)
                article._attributeValues.forEach({ (value) in
                    if let c = colors.first(where: { $0.attributeValueId == value.attributeValueId })?._attributeValue.attributeValueName {
                        color = c
                    }
                    if let s = sizes.first(where: { $0.attributeValueId == value.attributeValueId })?._attributeValue.attributeValueName {
                        size = s
                    }
                })
                title = "\(self.productName) (\(size!), \(color!))"
            }
            
            messages.append(
                ProductMessage(
                    operationType: .update,
                    product: MwsProduct(
                        sku: sku,
                        standardProductID: standardProductID ?? nil,
                        condition: Condition(conditionType: .new),
                        itemPackageQuantity: 1,
                        numberOfItems: 1,
                        descriptionData: DescriptionData(
                            title: title,
                            brand: self._brand.brandName,
                            description: self.productDescription.defaultValue()
                        ),
                        productData: ProductData(
                            clothing: Clothing(
                                variationData: VariationData(
                                    parentage: parentage,
                                    size: size,
                                    color: color,
                                    variationTheme: variationTheme
                                ),
                                classificationData: ClassificationData(
                                    clothingType: .outerwear,
                                    department: department ?? "",
                                    materialComposition: material ?? "",
                                    outerMaterial: material ?? ""
                                )
                            )
                        )
                    )
                )
            )
        }
        
        return ProductFeed(
            purgeAndReplace: true,
            messages: messages
        )
    }
    
    func relationshipFeed() -> RelationshipFeed {
        
        var relations: [Relation] = [Relation]()
        for article in self._articles {
            if article.articleBarcodes.first(where: { $0.tags.contains(where: { $0.valueName == "Amazon" }) }) == nil {
                continue
            }
            relations.append(
                Relation(
                    sku: "\(self.productCode)-\(article.articleId)",
                    type: .variation
                )
            )
        }
        
        let messages = [
            RelationshipMessage(
                operationType: .update,
                relationship: Relationship(
                    parentSKU: self.productCode,
                    relation: relations
                )
            )
        ]
        
        return RelationshipFeed(
            purgeAndReplace: true,
            messages: messages
        )
    }
    
    func imageFeed() -> ImageFeed {
        
        var messages = [ImageMessage]()
        var imageType: ImageType = .main
        self.productMedias.forEach { (media) in
            messages.append(
                ImageMessage(
                    operationType: .update,
                    productImage:
                    ProductImage(
                        sku: self.productCode,
                        imageType: imageType,
                        imageLocation: "http://\(server.serverName):\(server.serverPort)/media/\(media.name)"
                    )
                )
            )
            switch imageType {
            case .main:
                imageType = .pt1
            case .pt1:
                imageType = .pt2
            case .pt2:
                imageType = .pt3
            case .pt3:
                imageType = .pt4
            case .pt4:
                imageType = .pt5
            case .pt5:
                imageType = .pt6
            case .pt6:
                imageType = .pt7
            case .pt7:
                imageType = .pt8
            default:
                return
            }
        }
        
        return ImageFeed(
            purgeAndReplace: true,
            messages: messages
        )
    }
    
    func priceFeed() -> PriceFeed {
        
        var messages = [PriceMessage]()
        for article in self._articles {
            guard let barcode = article.articleBarcodes
                .first(where: { $0.tags.contains(where: { $0.valueName == "Amazon" }) }) else {
                continue
            }

            var salePrice: SalePrice?
            if barcode.discount.discountStartAt > 0 {
                salePrice = SalePrice(
                    price: Float(barcode.discount.discountPrice),
                    currency: .eur,
                    startDate: Date(timeIntervalSinceReferenceDate: TimeInterval(barcode.discount.discountStartAt)),
                    endDate: Date(timeIntervalSinceReferenceDate: TimeInterval(barcode.discount.discountFinishAt))
                )
            }
            
            messages.append(
                PriceMessage(
                    operationType: .update,
                    price: MwsPrice(
                        sku: "\(self.productCode)-\(article.articleId)",
                        standardPrice: StandardPrice(price: Float(barcode.price.selling), currency: .eur),
                        salePrice: salePrice
                    )
                )
            )
        }
        
        return PriceFeed(
            purgeAndReplace: true,
            messages: messages
        )
    }
    
    func inventoryFeed() -> InventoryFeed {
        
        var messages = [InventoryMessage]()
        for article in self._articles {
            
            if article.articleUpdated < self.productAmazonUpdated ||
                article.articleBarcodes.first(where: { $0.tags.contains(where: { $0.valueName == "Amazon" }) }) == nil {
                continue
            }

            let quantity = article._quantity - article._booked
            messages.append(
                InventoryMessage(
                    operationType: .update,
                    inventory: Inventory(
                        sku: "\(self.productCode)-\(article.articleId)",
                        quantity: Int(quantity)
                    )
                )
            )
        }
        
        return InventoryFeed(
            purgeAndReplace: true,
            messages: messages
        )
    }
}

