//
//  MwsRequest.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 22/04/18.
//

import Foundation
import PerfectLogger
import StORM

class MwsRequest : PostgresSqlORM, Codable {
    
    public var id: Int = 0
    public var requestSku : String = ""
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
        requestSku = this.data["requestsku"] as? String ?? ""
        requestXml = this.data["requestxml"] as? String ?? ""
        requestId = this.data["requestid"] as? Int ?? 0
        requestParentId = this.data["requestparentid"] as? Int ?? 0
        
        requestSubmissionId = this.data["requestsubmissionid"] as? String ?? ""
        requestCreatedAt = this.data["requestcreatedat"] as? Int ?? 0
        requestSubmittedAt = this.data["requestsubmittedat"] as? Int ?? 0
        requestCompletedAt = this.data["requestcompletedat"] as? Int ?? 0
        
        messagesProcessed = this.data["messagesprocessed"] as? Int ?? 0
        messagesSuccessful = this.data["messagessuccessful"] as? Int ?? 0
        messagesWithError = this.data["messageswitherror"] as? Int ?? 0
        messagesWithWarning = this.data["messageswithwarning"] as? Int ?? 0
        errorDescription = this.data["errordescription"] as? String ?? ""
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
    
    public func currentRequests() throws -> [MwsRequest] {
//        try self.query(whereclause: "requestcompletedat = $1", params: [0])
        try self.query(orderby: ["requestcreatedat DESC", "requestid"])
        return self.rows()
    }
    
    public func rangeRequests(startDate: Int, finishDate: Int) throws -> [MwsRequest] {
        try self.query(
            whereclause: "requestcreatedat >= $1 && requestcreatedat <= $2 ",
            params: [startDate, finishDate],
            orderby: ["requestcreatedat DESC", "requestid"]
        )
        return self.rows()
    }

    public func lastRequest() throws -> Int {
        let sql = "SELECT MAX(requestcreatedat) AS counter FROM \(table())";
        let getCount = try self.sqlRows(sql, params: [])
        return getCount.first?.data["counter"] as? Int ?? 0
    }
}
