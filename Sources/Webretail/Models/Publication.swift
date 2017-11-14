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
    public var publicationNew : Bool = false
    public var publicationStartAt : Int = 0
    public var publicationFinishAt : Int = 0
	public var publicationUpdated : Int = Int.now()
	
    public var _publicationStartAt: String {
        return publicationStartAt.formatDateShort()
    }
    
    public var _publicationFinishAt: String {
        return publicationFinishAt.formatDateShort()
    }

    private enum CodingKeys: String, CodingKey {
        case publicationId
        case productId
        case publicationFeatured
        case publicationNew
        case publicationStartAt
        case publicationFinishAt
    }
    
    open override func table() -> String { return "publications" }
    
    open override func to(_ this: StORMRow) {
        publicationId = this.data["publicationid"] as? Int ?? 0
        productId = this.data["productid"] as? Int ?? 0
		publicationFeatured = this.data["publicationfeatured"] as? Bool ?? false
        publicationNew = this.data["publicationnew"] as? Bool ?? false
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

    override init() {
        super.init()
    }
    
    required init(from decoder: Decoder) throws {
        super.init()
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        publicationId = try container.decode(Int.self, forKey: .publicationId)
        productId = try container.decode(Int.self, forKey: .productId)
        publicationFeatured = try container.decode(Bool.self, forKey: .publicationFeatured)
        publicationNew = try container.decode(Bool.self, forKey: .publicationNew)
        publicationStartAt = try container.decode(String.self, forKey: .publicationStartAt).DateToInt()
        publicationFinishAt = try container.decode(String.self, forKey: .publicationFinishAt).DateToInt()
    }
    
    func encode(to encoder: Encoder) throws {
        
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(publicationId, forKey: .publicationId)
        try container.encode(productId, forKey: .productId)
        try container.encode(publicationFeatured, forKey: .publicationFeatured)
        try container.encode(publicationNew, forKey: .publicationNew)
        try container.encode(_publicationStartAt, forKey: .publicationStartAt)
        try container.encode(_publicationFinishAt, forKey: .publicationFinishAt)
    }
}
