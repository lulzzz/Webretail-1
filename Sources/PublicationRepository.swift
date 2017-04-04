//
//  PublicationRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct PublicationRepository : PublicationProtocol {

    func getAll() throws -> [Publication] {
        let items = Publication()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Publication? {
        let item = Publication()
		try item.query(id: id)
		
        return item
    }
    
    func add(item: Publication) throws {
        try item.save {
            id in item.publicationId = id as! Int
        }
    }
    
    func update(id: Int, item: Publication) throws {

        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.publicationFeatured = item.publicationFeatured
        current.publicationStartAt = item.publicationStartAt
        current.publicationFinishAt = item.publicationFinishAt
		current.publicationUpdated = Int.now()
		try current.save()
    }
    
    func delete(id: Int) throws {
        let item = Publication()
        item.publicationId = id
        try item.delete()
    }
}
