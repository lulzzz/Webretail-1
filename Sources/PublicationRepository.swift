//
//  PublicationRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

class PublicationRepository : PublicationProtocol {
    
    func getAll() throws -> [Publication] {
        let items = Publication()
        try items.findAll()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Publication? {
        let item = Publication()
        try item.get(id)
        
        return item
    }
    
    func add(item: Publication) throws {
        try item.save {
            id in item.publicationId = id as! Int
        }
    }
    
    func update(id: Int, item: Publication) throws {
        try item.update(data: item.asData(), idValue: id)
    }
    
    func delete(id: Int) throws {
        let item = Publication()
        item.publicationId = id
        try item.delete()
    }
}
