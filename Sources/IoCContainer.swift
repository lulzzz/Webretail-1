//
//  IoCContainer.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 27/02/17.
//
//

import Foundation

class IoCContainer {
    
    var factories = [String: Any]()
    
    func register<T>(factory: @escaping () -> T) {
        let key = String(describing: T.self)
        factories[key] = factory
    }
    
    func resolve<T>() -> T {
        let key = String(describing: T.self)
        if let factory = factories[key] as? () -> T {
            return factory()
        } else {
            fatalError("Registration not found")
        }
    }
}
