//
//  Publication.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM
import PostgresStORM
import PerfectLib

class Publication: PostgresStORM, JSONConvertible {
    
    public var publicationId    : Int = 0
    public var productId		: Int = 0
    public var featured         : Bool = false
    public var startAt          : Int = Helper.now()
    public var finishAt         : Int = Helper.now()
    
    open override func table() -> String { return "publications" }
    
    open override func to(_ this: StORMRow) {
        publicationId	= this.data["publicationid"] as? Int    ?? 0
        productId		= this.data["productid"] as? Int        ?? 0
        featured		= this.data["featured"] as? Bool        ?? false
        startAt         = this.data["startat"] as? Int          ?? 0
        finishAt        = this.data["finishat"] as? Int         ?? 0
    }
    
    func rows() -> [Publication] {
        var rows = [Publication]()
        for i in 0..<self.results.rows.count {
            let row = Publication()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "publicationId": publicationId,
            "productId": productId,
            "featured": featured,
            "startAt": Helper.formatDate(unixdate: startAt),
            "finishAt": Helper.formatDate(unixdate: finishAt)
        ]
    }
}
