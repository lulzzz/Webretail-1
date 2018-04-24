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
        
        //TODO: init background service
        /*        
        let thread = Threading.getQueue(name: "mwsRequest", type: .concurrent)
        thread.dispatch {
            
            repeat {
                
                let mwsRequest = MwsRequest()
                do {
                    let products = try self.repository.getPublished(date: mwsRequest.lastRequest())
                    if products.count == 0 { return }
                    
                    var requests = [RequestFeed]()
                    var index = 0
                    products.forEach({ (product) in
                        index += 1
                        requests.append(RequestFeed(feed : product.productFeed(), id: index, parentId: 0))
                        index += 1
                        requests.append(RequestFeed(feed : product.relationshipFeed(), id: index, parentId: index - 1))
                        index += 1
                        requests.append(RequestFeed(feed : product.priceFeed(), id: index, parentId: index - 2))
                        index += 1
                        requests.append(RequestFeed(feed : product.inventoryFeed(), id: index, parentId: index - 3))
                        index += 1
                        requests.append(RequestFeed(feed : product.imageFeed(), id: index, parentId: index - 4))
                    })
                    self.mws.start(requests: requests)
                } catch {
                    print("mwsRequest: \(error)")
                }
                
                Threading.sleep(seconds: 300)
            } while true
         }
         */
//        let product = try? self.repository.get(id: 1)
//        var requests = [RequestFeed]()
//        requests.append(RequestFeed(feed : product!.productFeed(), id: 1, parentId: 0))
//        requests.append(RequestFeed(feed : product!.relationshipFeed(), id: 2, parentId: 1))
//        requests.append(RequestFeed(feed : product!.priceFeed(), id: 3, parentId: 2))
//        requests.append(RequestFeed(feed : product!.inventoryFeed(), id: 4, parentId: 3))
//        requests.append(RequestFeed(feed : product!.imageFeed(), id: 5, parentId: 4))
//
//        self.mws.start(requests: requests)
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
        let config: Config
        do {
//            try response.setJson(config)
            response.completed(status: .ok)
        } catch {
            response.badRequest(error: "\(request.uri) \(request.method): \(error)")
        }
    }

    func mwsConfigHandlerPUT(request: HTTPRequest, _ response: HTTPResponse) {
        let config: Config
        do {
//            try response.setJson(config)
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
