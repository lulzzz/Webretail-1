import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {
    Product, ProductCategory, Category, ProductAttribute,
    ProductAttributeValue, Article, ArticleForm
} from '../shared/models';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    getPublished(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/ecommerce');
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/ecommerce/category');
    }

    getByCategoryName(name: string): Observable<Product[]> {
        const url = name === 'Featured' ? '/api/ecommerce/featured' : '/api/ecommerce/category/' + name;
        return this.http.get<Product[]>(url);
    }

    getByProductName(name: string): Observable<Product> {
        const url = '/api/ecommerce/product/' + name;
        return this.http.get<Product>(url);
    }
}
