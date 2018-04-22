//
//  AmazonControler.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 22/04/18.
//

import Foundation
import PerfectHTTP
import mwsWebretail

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
    
    override init() {
        super.init()
        
        //TODO: init background service
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
    
    func callBack(request: RequestFeed) {
        print(request.requestSubmissionId)
    }
}
