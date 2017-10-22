//
//  Brand.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

class Brand: PostgresSqlORM, Codable {
    
    public var brandId : Int = 0
    public var brandName : String = ""
    public var brandCreated : Int = Int.now()
    public var brandUpdated : Int = Int.now()
    
    private enum CodingKeys: String, CodingKey {
        case brandId
        case brandName
    }

    open override func table() -> String { return "brands" }
    open override func tableIndexes() -> [String] { return ["brandName"] }

    open override func to(_ this: StORMRow) {
        brandId = this.data["brandid"] as? Int ?? 0
        brandName = this.data["brandname"] as? String ?? ""
        brandCreated = this.data["brandcreated"] as? Int ?? 0
        brandUpdated = this.data["brandupdated"] as? Int ?? 0
    }
    
    func rows() -> [Brand] {
        var rows = [Brand]()
        for i in 0..<self.results.rows.count {
            let row = Brand()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
}
