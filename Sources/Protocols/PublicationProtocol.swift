//
//  PublicationProtocol.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

protocol PublicationProtocol {
    
    func getAll() throws -> [Publication]
    
    func get(id: Int) throws -> Publication?
    
    func add(item: Publication) throws
    
    func update(id: Int, item: Publication) throws
    
    func delete(id: Int) throws
}