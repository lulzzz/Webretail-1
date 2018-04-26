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
        
//        let p = try? self.repository.get(id: 1)
//        if let p = p {
//            print(p.productFeed())
//        }
        /*
        let thread = Threading.getQueue(name: "mwsRequest", type: .concurrent)
        thread.dispatch {
            
            repeat {
                
                do {
                    let products = try self.repository.getPublished()
                    if products.count == 0 { return }
                    
                    var requests = [RequestFeed]()
                    products.forEach({ (product) in
                        
                        var index = Int.now()

                        if product.productAmazonUpdated == 0 {
                            let parent = index
                            requests.append(RequestFeed(feed : product.productFeed(), id: index, parentId: 0))
                            index += 1
                            requests.append(RequestFeed(feed : product.relationshipFeed(), id: index, parentId: parent))
                            index += 1
                            requests.append(RequestFeed(feed : product.priceFeed(), id: index, parentId: parent))
                            index += 1
                            requests.append(RequestFeed(feed : product.inventoryFeed(), id: index, parentId: parent))
                            index += 1
                            requests.append(RequestFeed(feed : product.imageFeed(), id: index, parentId: parent))
                        } else {
                            requests.append(RequestFeed(feed : product.inventoryFeed(), id: index, parentId: 0))
                        }
 
                        do {
                            try product.update(data: [("productAmazonUpdated", Int.now())], idName:"productId", idValue: product.productId)
                        } catch {
                            print("productAmazonUpdated: \(error)")
                        }
                    })
                    self.mws.start(requests: requests)
                } catch {
                    print("mwsRequest: \(error)")
                }
                
                Threading.sleep(seconds: 300)
            } while true
        }
    */
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
        } catch {
            print(error)
        }

//        print("\(request.requestSubmissionId): \(request.requestSubmittedAt) => \(request.requestCompletedAt)")
//        if request.requestCompletedAt == 0 {
//            print(request.requestFeed.xml())
//        }
    }
}
