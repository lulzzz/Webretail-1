import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {
    Product, ProductCategory, Category, ProductAttribute,
    ProductAttributeValue, Article, ArticleForm
} from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class ProductService {
    constructor(private http: Http) {
    }

    getPublished(): Observable<Product[]> {
        return this.http.get('api/ecommerce', { headers: Helpers.getHeaders() })
            .map(result => <Product[]>result.json());
    }

    getCategories(): Observable<Category[]> {
        return this.http.get('api/ecommerce/category', { headers: Helpers.getHeaders() })
            .map(result => <Category[]>result.json());
    }

    getByCategoryId(id: string): Observable<Product[]> {
        const url = id === 'featured' ? 'api/ecommerce/featured' : 'api/ecommerce/category/' + id;
        return this.http.get(url, { headers: Helpers.getHeaders() })
            .map(result => <Product[]>result.json());
    }

    getByProductId(id: number): Observable<Product> {
        const url = 'api/ecommerce/product/' + id;
        return this.http.get(url, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }
}
