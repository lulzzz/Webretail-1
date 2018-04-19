////
////  AmazonMWS.swift
////  Webretail
////
////  Created by Gerardo Grisolini on 18/04/18.
////
//
//import Foundation
//import mwsWebretail
//
//class AmazonMWS: NSObject {
//    
//    lazy var config = Config(
//        endpoint: "mws-eu.amazonservices.com",
//        marketplaceId: "APJ6JRA9NG5V4",
//        sellerId: "A13I2O1RE4ALEL",
//        accessKey: "AKIAJMIJZF676VEJT4JA",
//        secretKey: "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",
//        authToken: "amzn.mws.56b161b3-fd76-94f8-86ce-4d9224a42d58",
//        userAgent: "Webretail/1.0 (Language=Swift/4.1)"
//    )
//    
//    func post() {
//        let mws = mwsWebretail(config: config)
//        let messages = [
//            RelationshipMessage(
//                operationType: .update,
//                relationship: Relationship(
//                    parentSKU: "WEB1002244",
//                    relation: [
//                        Relation(
//                            sku: "WEB1002244-0",
//                            childDetailPageDisplay: .displayOnlyOnParent,
//                            type: .variation
//                        ),
//                        Relation(
//                            sku: "WEB1002244-1",
//                            childDetailPageDisplay: .displayOnlyOnParent,
//                            type: .variation
//                        ),
//                        Relation(
//                            sku: "WEB1002244-2",
//                            childDetailPageDisplay: .displayOnlyOnParent,
//                            type: .variation
//                        )
//                    ]
//                )
//            )
//        ]
//        
//        let relationshipFeed = RelationshipFeed(
//            purgeAndReplace: true,
//            messages: messages
//        )
//        
//        mws.post(relationshipFeed: relationshipFeed) { (response) -> (Void) in
//            print(response)
//
//            if response == "_SUBMITTED_" {
//            }
//        }
//    }
//}
//
//
