//
//  Period.swift
//  macWebretail
//
//  Created by Gerardo Grisolini on 19/06/17.
//  Copyright © 2017 Gerardo Grisolini. All rights reserved.
//

import PerfectLib

class Period: JSONConvertible {
    
    public var start : Int = 0
    public var finish : Int = 0
    
    func setJSONValues(_ values:[String:Any]) {
        if let s = values["start"] as? String {
            self.start = s.DateToInt()
        }
        if let f = values["finish"] as? String {
            self.finish = f.DateToInt()
        }
    }
    
    func jsonEncodedString() throws -> String {
        return try self.getJSONValues().jsonEncodedString()
    }
    
    func getJSONValues() -> [String : Any] {
        return [
            "start": start,
            "finish": finish
        ]
    }
}

