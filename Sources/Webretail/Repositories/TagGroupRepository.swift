//
//  TagGroupRepository.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 07/11/17.
//

import StORM

struct TagGroupRepository : TagGroupProtocol {
    
    func getAll() throws -> [TagGroup] {
        let items = TagGroup()
        try items.query()
        
        return items.rows()
    }
    
    func get(id: Int) throws -> TagGroup? {
        let item = TagGroup()
        try item.query(id: id)
        
        return item
    }
    
    func getValues(id: Int) throws -> [TagValue] {
        let items = TagValue()
        try items.query(whereclause: "tagGroupId = $1",
                        params: [id])
        
        return items.rows()
    }
    
    func add(item: TagGroup) throws {
        item.tagGroupCreated = Int.now()
        item.tagGroupUpdated = Int.now()
        try item.save {
            id in item.tagGroupId = id as! Int
        }
    }
    
    func update(id: Int, item: TagGroup) throws {
        
        guard let current = try get(id: id) else {
            throw StORMError.noRecordFound
        }
        
        current.tagGroupName = item.tagGroupName
        current.tagGroupUpdated = Int.now()
        try current.save()
    }
    
    func delete(id: Int) throws {
        let item = TagGroup()
        item.tagGroupId = id
        try item.delete()
        
        try item.sql("DELETE FROM tagvalues WHERE tagId = $1", params: [String(id)])
    }
}

