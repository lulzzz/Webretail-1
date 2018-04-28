//
//  AmazonControler.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 22/04/18.
//

import Foundation
import PerfectHTTP
import PerfectThread
import mwsWebretail
import StORM

public class AmazonController: NSObject {
    
    lazy var config = Config(
        endpoint: "mws-eu.amazonservices.com",
        marketplaceId: "APJ6JRA9NG5V4",
        sellerId: "A13I2O1RE4ALEL",
        accessKey: "AKIAJMIJZF676VEJT4JA",
        secretKey: "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",
        authToken: "amzn.mws.56b161b3-fd76-94f8-86ce-4d9224a42d58",
        userAgent: "Webretail/1.0 (Language=Swift/4.1)"
    )
    
    lazy var mws = mwsService(config: config, notify: callBack)
    private let repository: ProductProtocol
    
    override init() {
        self.repository = ioCContainer.resolve() as ProductProtocol
        super.init()
        
        let thread = Threading.getQueue(name: "mwsRequest", type: .concurrent)
        thread.dispatch {
            
            while(true) {
                
                if self.mws.isSubmitted() {
                    do {
                        var requests = [RequestFeed]()
                        let products = try self.repository.getAmazonChanges()
                        products.forEach({ (p) in
                            var index = Int.now()
                            if p.productAmazonUpdated == 1 {
                                let parent = index
                                requests.append(RequestFeed(sku: p.productCode, feed : p.productFeed(), id: index, parentId: 0))
                                index += 1
                                requests.append(RequestFeed(sku: p.productCode, feed : p.relationshipFeed(), id: index, parentId: parent))
                                index += 1
                                requests.append(RequestFeed(sku: p.productCode, feed : p.priceFeed(), id: index, parentId: parent))
                                index += 1
                                requests.append(RequestFeed(sku: p.productCode, feed : p.inventoryFeed(), id: index, parentId: parent))
                                index += 1
                                requests.append(RequestFeed(sku: p.productCode, feed : p.imageFeed(), id: index, parentId: parent))
                            } else {
                                requests.append(RequestFeed(sku: p.productCode, feed : p.inventoryFeed(), id: index, parentId: 0))
                            }
                        })
                        self.mws.start(requests: requests)
                    } catch {
                        print("mwsRequest: \(error)")
                    }
                }
                
                Threading.sleep(seconds: 300)
            }
        }
    }
    
    public func getRoutes() -> Routes {
        var routes = Routes()
        
        routes.add(method: .get, uri: "/api/mws/config", handler: mwsConfigHandlerGET)
        routes.add(method: .put, uri: "/api/mws/config", handler: mwsConfigHandlerPUT)
        routes.add(method: .get, uri: "/api/mws", handler: mwsHandlerGET)
        routes.add(method: .get, uri: "/api/mws/{start}/{finish}", handler: mwsHandlerGET)
        
        return routes
    }
    
    
    func mwsConfigHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            try response.setJson(config)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func mwsConfigHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        do {
            config = request.getJson()!
            try response.setJson(config)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func mwsHandlerGET(request: HTTPRequest, _ response: HTTPResponse) {
        let data: [MwsRequest]
        do {
            let mwsRequest = MwsRequest()
            if let start = request.urlVariables["start"], let finish = request.urlVariables["finish"] {
                data = try mwsRequest.rangeRequests(startDate: Int(start) ?? 0, finishDate: Int(finish) ?? 0)
            } else {
                data = try mwsRequest.currentRequests()
            }
            
            try response.setJson(data)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }
    
    func callBack(request: RequestFeed) {
        
        do {
            let mwsRequest = MwsRequest()
            try mwsRequest.query(whereclause: "requestSubmissionId = $1",
                            params: [request.requestSubmissionId],
                            cursor: StORMCursor(limit: 1, offset: 0))
            mwsRequest.requestId = request.requestId
            mwsRequest.requestParentId = request.requestParentId
            mwsRequest.requestSubmissionId = request.requestSubmissionId
            mwsRequest.requestSku = request.requestSku
            mwsRequest.requestXml = request.requestFeed.xml()
            mwsRequest.requestCreatedAt = request.requestCreatedAt
            mwsRequest.requestSubmittedAt = request.requestSubmittedAt
            mwsRequest.requestCompletedAt = request.requestCompletedAt
            mwsRequest.messagesProcessed = request.messagesProcessed
            mwsRequest.messagesSuccessful = request.messagesSuccessful
            mwsRequest.messagesWithError = request.messagesWithError
            mwsRequest.messagesWithWarning = request.messagesWithWarning
            mwsRequest.errorDescription = request.errorDescription
            try mwsRequest.save()
            try Product().update(data: [("productAmazonUpdated", Int.now())], idName:"productCode", idValue: mwsRequest.requestSku)
        } catch {
            print("callBack: \(error)")
        }

//        print("\(request.requestSubmissionId): \(request.requestSubmittedAt) => \(request.requestCompletedAt)")
//        if request.requestCompletedAt == 0 {
//            print(request.requestFeed.xml())
//        }
    }
}
