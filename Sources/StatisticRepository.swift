//
//  StatisticRepository.swift
//  macWebretail
//
//  Created by Gerardo Grisolini on 20/06/17.
//  Copyright © 2017 Gerardo Grisolini. All rights reserved.
//

import Foundation
import StORM

struct StatisticRepository : StatisticProtocol {
    
    let colors: [String] = [
        "limegreen", "dodgerblue", "orange", "midnightblue",
        "indianred", "cornflowerblue", "darkcyan", "green", "gray", "lightyellow",
        "lightskyblue", "lightsalmon", "lightslategray", "lightseagreen", "lightgray"
    ];
    
    func getDevices() throws -> Statistics {
        let data = StatisticItem()
        let sql = "SELECT MAX(a.movementId) AS id, a.movementDevice AS label, SUM(b.movementArticleQuantity * b.movementArticlePrice) AS value " +
                  "FROM movements AS a " +
                  "LEFT JOIN movementArticles AS b ON a.movementId = b.movementId " +
                  "WHERE a.invoiceId > $1 OR a.movementCausal ->> 'causalIsPos' = $2 " +
                  "GROUP BY a.movementDevice " +
                  "ORDER BY a.movementDevice"
        data.results.rows = try data.sqlRows(sql, params: ["0", "true"])
        
        return self.toResult(items: data.rows())
    }
    
    private func getData(year: Int) throws -> [MovementArticle] {
        let start = "\(year)-01-01".DateToInt()
        let finish = "\(year)-12-31".DateToInt()
        
        let data = MovementArticle()
        let sql = "SELECT b.* " +
            "FROM movements AS a " +
            "LEFT JOIN movementArticles AS b ON a.movementId = b.movementId " +
            "WHERE a.movementDate >= $1 AND a.movementDate <= $2 AND (a.invoiceId > $3 OR a.movementCausal ->> 'causalIsPos' = $4)"
        data.results.rows = try data.sqlRows(sql, params: ["\(start)", "\(finish)", "0", "true"])
        
        return data.rows()
    }
    
    func getCategories(year: Int) throws -> Statistics {
        var data = [StatisticItem]()
        let movements = try getData(year: year).groupBy {
            $0.movementArticleProduct._categories.first!._category.categoryName
        }
        for movement in movements {
            let item = StatisticItem()
            item.label = movement.key
            item.value = movement.value.map { $0.movementArticleQuantity * $0.movementArticlePrice }.reduce(0, +)
            data.append(item)
        }
        let filtered = Array(data.sorted(by: { $0.value > $1.value }).prefix(15))
        
        return self.toResult(items: filtered)
    }
    
    func getProducts(year: Int) throws -> Statistics {
        var data = [StatisticItem]()
        let movements = try getData(year: year).groupBy {
            $0.movementArticleProduct.productName
        }
        for movement in movements {
            let item = StatisticItem()
            item.label = movement.key
            item.value = movement.value.map { $0.movementArticleQuantity * $0.movementArticlePrice }.reduce(0, +)
            data.append(item)
        }
        let filtered = Array(data.sorted(by: { $0.value > $1.value }).prefix(15))
        
        return self.toResult(items: filtered)
    }
    
    func getCategoriesForMonth(year: Int) throws -> Statistics {
        var data = [StatisticItem]()
        let movements = try getData(year: year)
        let calendar = Calendar.current
        for movement in movements {
            let item = StatisticItem()
            let date = Date(timeIntervalSinceReferenceDate: TimeInterval(movement.movementArticleUpdated))
            item.id = calendar.component(.month, from: date)
            item.label = movement.movementArticleProduct._categories.first!._category.categoryName
            item.value = movement.movementArticleQuantity * movement.movementArticlePrice
            data.append(item)
        }
        
        return toResultForMonth(items: toGrouped(items: data))
    }
    
    func getProductsForMonth(year: Int) throws -> Statistics {
        var data = [StatisticItem]()
        let movements = try getData(year: year)
        let calendar = Calendar.current
        for movement in movements {
            let item = StatisticItem()
            let date = Date(timeIntervalSinceReferenceDate: TimeInterval(movement.movementArticleUpdated))
            item.id = calendar.component(.month, from: date)
            item.label = movement.movementArticleProduct.productName
            item.value = movement.movementArticleQuantity * movement.movementArticlePrice
            data.append(item)
        }
        
        return toResultForMonth(items: toGrouped(items: data))
    }
    
    private func toResult(items: [StatisticItem]) -> Statistics {
        let result = Statistics()
        result.labels.append(contentsOf: items.map { $0.label })
        let statistic = Statistic()
        statistic.data.append(contentsOf: items.map { $0.value })
        statistic.backgroundColor = Array(colors.prefix(items.count))
        result.datasets = [statistic]
        
        return result
    }
    
    private func toResultForMonth(items: [StatisticItem]) -> Statistics {
        let result = Statistics()
        result.labels = Array(repeatElement("", count: 12))
        
        let labels = items.sorted(by: { $0.value > $1.value }).map { $0.label }.unique().prefix(15)
        let lenght = labels.count;
        
        result.datasets = Array(repeatElement(Statistic(), count: lenght))
        for i in 0..<lenght {
            result.datasets[i].label = labels[i]
            result.datasets[i].borderColor = colors[i]
            result.datasets[i].data = Array(repeatElement(0, count: 12))
        }
        
        let dateFormatter: DateFormatter = DateFormatter()
        let months = dateFormatter.shortMonthSymbols!
        for i in 0..<12 {
            result.labels[i] = months[i]
            for e in 0..<lenght {
                result.datasets[e].data[i] = items.filter({ (p) -> Bool in return p.id == i && p.label == labels[e] }).map { $0.value }.first ?? 0
            }
        }
        
        return result
    }
    
    private func toGrouped(items: [StatisticItem]) -> [StatisticItem] {
        var result = [StatisticItem]()
        let rows = items.groupBy { "\($0.id)#\($0.label)" }
        for row in rows {
            let item = StatisticItem()
            let keys = row.key.split("#")
            item.id = Int(keys.first!)!
            item.label = keys.last!
            item.value = row.value.map{ $0.value }.reduce(0, +)
            result.append(item)
        }
        return result
    }
}
