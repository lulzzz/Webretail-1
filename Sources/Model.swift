//
//  Model.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 16/09/17.
//

import Foundation

struct Model: Codable {
    var firstName: String
    var lastName: String
    var nickname: String?
    
    // Since fullName is a computed property, it's excluded by default
    var fullName: String {
        return firstName + " " + lastName
    }
    
    private enum CodingKeys: String, CodingKey {
        case firstName
        case lastName
        case fullName
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        firstName = try container.decode(String.self, forKey: .firstName)
        lastName = try container.decode(String.self, forKey: .lastName)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(firstName, forKey: .firstName)
        try container.encode(lastName, forKey: .lastName)
        try container.encode(fullName, forKey: .fullName)
    }
}
