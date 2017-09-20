//
//  Publication.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class Publication: PostgresSqlORM, Codable {
    
    public var publicationId : Int = 0
    public var productId : Int = 0
    public var publicationFeatured : Bool = false
	public var publicationIsValid : Bool = false
    public var publicationStartAt : Int = Int.now()
    public var publicationFinishAt : Int = Int.now()
	public var publicationUpdated : Int = Int.now()
	
    open override func table() -> String { return "publications" }
    
    open override func to(_ this: StORMRow) {
        publicationId = this.data["publicationid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
		publicationFeatured = this.data["publicationfeatured"] as? Bool ?? false
        publicationIsValid = this.data["publicationisvalid"] as? Bool ?? false
        publicationStartAt = this.data["publicationstartat"] as? Int ?? 0
        publicationFinishAt = this.data["publicationfinishat"] as? Int ?? 0
		publicationUpdated = this.data["publicationupdated"] as? Int ?? 0
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
}