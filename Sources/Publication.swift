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

class Publication: PostgresSqlORM, JSONConvertible {
    
    public var publicationId    : Int = 0
    public var productId		: Int = 0
    public var featured         : Bool = false
    public var startAt          : Int = Int.now()
    public var finishAt         : Int = Int.now()
    
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
    
    public func setJSONValues(_ values:[String:Any]) {
        self.publicationId =    getJSONValue(named: "publicationId",    from: values, defaultValue: 0)
        self.productId =        getJSONValue(named: "productId",        from: values, defaultValue: 0)
        self.featured =         getJSONValue(named: "featured",         from: values, defaultValue: false)
        self.startAt =          getJSONValue(named: "startAt",          from: values, defaultValue: 0)
        self.finishAt =         getJSONValue(named: "finishAt",         from: values, defaultValue: 0)
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "publicationId": publicationId,
            "productId": productId,
            "featured": featured,
            "startAt": startAt.formatDate(),
            "finishAt": finishAt.formatDate()
        ]
    }
}
