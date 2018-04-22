//
//  AmazonMWS.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 18/04/18.
//
import Foundation
import StORM
import PerfectLogger
import PerfectHTTP
import mwsWebretail

typealias MwsProduct = mwsWebretail.Product
typealias MwsPrice = mwsWebretail.Price

class MwsRequest : PostgresSqlORM, Codable {
    
    public var id: Int = 0
    public var requestXml : String = ""
    public var requestId: Int = 0
    public var requestParentId: Int = 0
    
    public var requestSubmissionId: String = ""
    public var requestCreatedAt: Int = Int.now()
    public var requestSubmittedAt: Int = 0
    public var requestCompletedAt: Int = 0
    
    public var messagesProcessed: Int = 0
    public var messagesSuccessful: Int = 0
    public var messagesWithError: Int = 0
    public var messagesWithWarning: Int = 0
    public var errorDescription: String = ""

    open override func table() -> String { return "mwsrequests" }
    
    override init() {
        super.init()
    }

    open override func to(_ this: StORMRow) {
        id = this.data["id"] as? Int ?? 0
        requestXml = this.data["requestxml"] as? String ?? ""
        requestId = this.data["requestid"] as? Int ?? 0
        requestParentId = this.data["requestparentid"] as? Int ?? 0
        
        requestSubmissionId = this.data["requestsubmissionid"] as? String ?? ""
        requestCreatedAt = this.data["requestcreatedat"] as? Int ?? 0
        requestSubmittedAt = this.data["requestsubmittedat"] as? Int ?? 0
        requestCompletedAt = this.data["requestcompletedat"] as? Int ?? 0

        messagesProcessed = this.data["messagesProcessed"] as? Int ?? 0
        messagesSuccessful = this.data["messagesSuccessful"] as? Int ?? 0
        messagesWithError = this.data["messagesWithError"] as? Int ?? 0
        messagesWithWarning = this.data["messagesWithWarning"] as? Int ?? 0
        errorDescription = this.data["errorDescription"] as? String ?? ""
    }

    func rows() -> [MwsRequest] {
        var rows = [MwsRequest]()
        for i in 0..<self.results.rows.count {
            let row = MwsRequest()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }

    public func currentRequests() -> [MwsRequest] {
        do {
            try self.query(whereclause: "requestcompletedat = $1", params: [0])
        } catch {
            LogFile.info("\(error)")
        }
        return self.rows()
    }

    public func rangeRequests(startDate: Int, finishDate: Int) -> [MwsRequest] {
        do {
            try self.query(
                whereclause: "requestcreatedat >= $1 && requestcreatedat <= $2 ",
                params: [startDate, finishDate]
            )
        } catch {
            LogFile.info("\(error)")
        }
        return self.rows()
    }
}

class AmazonMWS: NSObject {
    
    lazy var config = Config(
        endpoint: "mws-eu.amazonservices.com",
        marketplaceId: "APJ6JRA9NG5V4",
        sellerId: "A13I2O1RE4ALEL",
        accessKey: "AKIAJMIJZF676VEJT4JA",
        secretKey: "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",
        authToken: "amzn.mws.56b161b3-fd76-94f8-86ce-4d9224a42d58",
        userAgent: "Webretail/1.0 (Language=Swift/4.1)"
    )
    
    override init() {
        super.init()
        //let mws = mwsWebretail(config: config, notify: nil)
    }

    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/mws", handler: mwsHandlerGET)
        routes.add(method: .get, uri: "/api/mws/{start}/{finish}", handler: mwsHandlerGET)
        
        return routes
    }


    func mwsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let data: [MwsRequest]
        do {
            let mwsRequest = MwsRequest()
            if let start = request.urlVariables["start"], let finish = request.urlVariables["finish"] {
                data = mwsRequest.rangeRequests(startDate: Int(start) ?? 0, finishDate: Int(finish) ?? 0)
            } else {
                data = mwsRequest.currentRequests()
            }

            try response.setJson(data)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
}

extension Product {
    
    func productFeed() -> ProductFeed {
        
        var messages: [ProductMessage] = [ProductMessage]()
        
        let department = self._categories.first(where: { $0._category.categoryIsPrimary })?._category.categoryName
        let material = self._attributes.first(where: { $0._attribute.attributeName == "Material" })?._attributeValues.first?._attributeValue.attributeValueName
        let sizeId = self._attributes.first(where: { $0._attribute.attributeName == "Size" })?.attributeId ?? 0
        let colorId = self._attributes.first(where: { $0._attribute.attributeName == "Color" })?.attributeId ?? 0
        var variationTheme: VariationTheme = .sizeColor
        if sizeId == 0 { variationTheme = .color }
        if colorId == 0 { variationTheme = .size }

        messages.append(
            ProductMessage(
                operationType: .update,
                product: MwsProduct(
                    sku: "WEB\(self.productCode)",
                    standardProductID: nil,
                    condition: Condition(conditionType: .new),
                    itemPackageQuantity: nil,
                    numberOfItems: nil,
                    descriptionData: DescriptionData(
                        title: self.productName,
                        brand: self._brand.brandName,
                        description: self.productDescription.defaultValue(),
                        bulletPoint: ""
                    ),
                    productData: ProductData(
                        clothing: Clothing(
                            variationData: VariationData(
                                parentage: .parent,
                                size: nil,
                                color: nil,
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
        
        self._articles.forEach { (article) in
            
            let barcode = article.articleBarcodes.first(where: { $0.tags.count == 0 })!.barcode
            let attributeValues = article._attributeValues
                .filter({ $0._attributeValue.attributeId == sizeId || $0._attributeValue.attributeId == colorId })
                .compactMap({ $0._attributeValue })
            let attibuteDesc = attributeValues.compactMap({ $0.attributeValueName }).joined(separator: ", ")
            let size = attributeValues.first(where: { $0.attributeId == sizeId })?.attributeValueName
            let color = attributeValues.first(where: { $0.attributeId == colorId })?.attributeValueName
            
            messages.append(
                ProductMessage(
                    operationType: .update,
                    product: MwsProduct(
                        sku: "WEB\(self.productCode)-\(article.articleId)",
                        standardProductID: StandardProductID(type: .EAN, value: barcode),
                        condition: Condition(conditionType: .new),
                        itemPackageQuantity: 1,
                        numberOfItems: 1,
                        descriptionData: DescriptionData(
                            title: "\(self.productName) (\(attibuteDesc))",
                            brand: self._brand.brandName,
                            description: self.productDescription.defaultValue(),
                            bulletPoint: ""),
                        productData: ProductData(
                            clothing: Clothing(
                                variationData: VariationData(
                                    parentage: .parent,
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
        self._articles.forEach { (article) in
            relations.append(
                Relation(
                    sku: "WEB\(self.productCode)-\(article.articleId)",
                    childDetailPageDisplay: .displayOnlyOnParent,
                    type: .variation
                )
            )
        }
        
        let messages = [
            RelationshipMessage(
                operationType: .update,
                relationship: Relationship(
                    parentSKU: "WEB\(self.productCode)",
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
                        sku: "WEB\(self.productCode)",
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
        self._articles.forEach { (article) in
            
            var price = article.articleBarcodes.first(where: { $0.tags.count == 0 })?.price.selling ?? 0
            if price == 0 {
                price = self.productPrice.selling
            }
            messages.append(
                PriceMessage(
                    operationType: .update,
                    price: MwsPrice(
                        sku: "WEB\(self.productCode)-\(article.articleId)",
                        standardPrice: StandardPrice(price: Float(price), currency: .eur)
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
        self._articles.forEach { (article) in
            
            let quantity = article._quantity - article._booked
            messages.append(
                InventoryMessage(
                    operationType: .update,
                    inventory: Inventory(
                        sku: "WEB\(self.productCode)-\(article.articleId)",
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

