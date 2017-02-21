import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product, ProductCategory, ProductAttribute, ProductAttributeValue } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class ProductService {

    constructor(private http: Http) {
    }

    getProducts() : Observable<Product[]> {
        return this.http.get('api/product', { headers: Helpers.getHeaders() })
            .map(result => <Product[]>result.json());
    }

    getProduct(id: number) : Observable<Product> {
        return this.http.get('/api/product/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    create(model: Product) : Observable<Product> {
        return this.http.post('/api/product', model, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    update(id: number, model: Product) : Observable<Product> {
        return this.http.put('/api/product/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/product/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addCategory(model: ProductCategory) : Observable<ProductCategory> {
        return this.http.post('/api/productcategory', model, { headers: Helpers.getHeaders() })
            .map(result => <ProductCategory>result.json());
    }

    removeCategory(model: ProductCategory) : Observable<any> {
        return this.http.put('/api/productcategory', model, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addAttribute(model: ProductAttribute) : Observable<ProductAttribute> {
        return this.http.post('/api/productattribute', model, { headers: Helpers.getHeaders() })
            .map(result => <ProductAttribute>result.json());
    }

    removeAttribute(model: ProductAttribute) : Observable<any> {
        return this.http.put('/api/productattribute', model, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addAttributeValue(model: ProductAttributeValue) : Observable<ProductAttributeValue> {
        return this.http.post('/api/productattributevalue', model, { headers: Helpers.getHeaders() })
            .map(result => <ProductAttributeValue>result.json());
    }

    removeAttributeValue(model: ProductAttributeValue) : Observable<any> {
        return this.http.put('/api/productattributevalue', model, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    build(id: number) : Observable<any> {
        return this.http.get('/api/product/' + id + '/build', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
