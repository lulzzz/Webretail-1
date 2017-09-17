//
//  Statistic.swift
//  macWebretail
//
//  Created by Gerardo Grisolini on 20/06/17.
//  Copyright © 2017 Gerardo Grisolini. All rights reserved.
//

import StORM

class Statistics: Codable {
    
    public var labels : [String] = [String]()
    public var datasets: [Statistic] = [Statistic]()
}

class Statistic: Codable {
    
    public var label : String = ""
    public var data: [Double] = [Double]()
    public var backgroundColor: [String] = [String]()
    public var borderColor : String = ""
    public var fill : Bool = false
}

class StatisticItem: PostgresSqlORM, Codable {
    
    public var id : Int = 0
    public var label : String = ""
    public var value : Double = 0
    
    override open func to(_ this: StORMRow) {
        id = this.data["id"] as? Int ?? 0
        label = this.data["label"] as? String ?? ""
        value = Double(this.data["value"] as? Float ?? 0)
    }
    
    /// Iterate through rows and set to object data
    func rows() -> [StatisticItem] {
        var rows = [StatisticItem]()
        for i in 0..<self.results.rows.count {
            let row = StatisticItem()
            row.to(self.results.rows[i])
            rows.append(row)
        }
        return rows
    }
}

