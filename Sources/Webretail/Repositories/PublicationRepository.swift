//
//  PublicationRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 17/02/17.
//
//

import StORM

struct PublicationRepository : PublicationProtocol {

    func get() throws -> [Publication] {
        let items = Publication()
        try items.query(
            whereclause: "publicationStartAt <= $1 AND publicationFinishAt >= $1",
            params: [Int.now()])
        
        return items.rows()
    }
    
    func get(id: Int) throws -> Publication? {
        let item = Publication()
		try item.query(id: id)

        return item.publicationId == 0 ? nil : item
    }

    func getByProduct(productId: Int) throws -> Publication? {
        let item = Publication()
        try item.query(
            whereclause: "productId = $1", params: [productId],
            cursor: StORMCursor(limit: 1, offset: 0)
        )
        
        if (item.publicationId == 0) {
            throw StORMError.noRecordFound
        }
        
        return item.publicationId == 0 ? nil : item
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
        
        current.publicationAmazon = item.publicationAmazon
        current.publicationFeatured = item.publicationFeatured
        current.publicationNew = item.publicationNew
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
