﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {
    Product, ProductCategory, ProductAttribute,
    ProductAttributeValue, Article, ArticleForm,
    Tax, ItemValue, GroupItem
} from '../shared/models';
import { Helpers } from '../shared/helpers';
import { ArticleInfoPipe } from '../pipes/articleinfo.pipe';

@Injectable()
export class ProductService {

    public product: Product;
    public products: Product[];

    constructor(private http: Http) {
    }

    getTaxes(): Observable<Tax[]> {
        return this.http.get('api/producttax', { headers: Helpers.getHeaders() })
            .map(result => <Tax[]>result.json());
    }

    getTypes(): Observable<ItemValue[]> {
        return this.http.get('api/producttype', { headers: Helpers.getHeaders() })
            .map(result => <ItemValue[]>result.json());
    }

    getProducts(): Observable<Product[]> {
        return this.http.get('api/product', { headers: Helpers.getHeaders() })
            .map(result => <Product[]>result.json());
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get('/api/product/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    getBarcode(id: string): Observable<Product> {
        return this.http.get('/api/product/barcode/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    getArticles(id: number): Observable<Article[]> {
        return this.http.get('/api/product/' + id + '/article', { headers: Helpers.getHeaders() })
            .map(result => <Article[]>result.json());
    }

    getStock(id: number, storeIds: string): Observable<ArticleForm> {
        return this.http.get('/api/product/' + id + '/store/' + storeIds, { headers: Helpers.getHeaders() })
            .map(result => <ArticleForm>result.json());
    }

    getGroup(id: number): Observable<[GroupItem]> {
        return this.http.get('/api/product/' + id + '/group', { headers: Helpers.getHeaders() })
            .map(result => <[GroupItem]>result.json());
    }

    addArticle(model: Article): Observable<GroupItem> {
        return this.http.post('/api/article', model, { headers: Helpers.getHeaders() })
            .map(result => <GroupItem>result.json());
    }

    updateArticle(id: number, model: Article): Observable<Article> {
        return this.http.put('/api/article/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Article>result.json());
    }

    removeArticle(id: number): Observable<any> {
        return this.http.delete('/api/article/' + id, { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }

    create(model: Product): Observable<Product> {
        return this.http.post('/api/product', model, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    update(id: number, model: Product): Observable<Product> {
        return this.http.put('/api/product/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    resetAmazon(id: number): Observable<any> {
        return this.http.get('/api/product/' + id + '/reset', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/product/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addCategories(models: ProductCategory[]): Observable<ProductCategory[]> {
        return this.http.post('/api/productcategory', models, { headers: Helpers.getHeaders() })
            .map(result => <ProductCategory[]>result.json());
    }

    removeCategories(models: ProductCategory[]): Observable<any> {
        return this.http.put('/api/productcategory', models, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addAttributes(models: ProductAttribute[]): Observable<ProductAttribute[]> {
        return this.http.post('/api/productattribute', models, { headers: Helpers.getHeaders() })
            .map(result => <ProductAttribute[]>result.json());
    }

    removeAttributes(models: ProductAttribute[]): Observable<any> {
        return this.http.put('/api/productattribute', models, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addAttributeValues(models: ProductAttributeValue[]): Observable<ProductAttributeValue[]> {
        return this.http.post('/api/productattributevalue', models, { headers: Helpers.getHeaders() })
            .map(result => <ProductAttributeValue[]>result.json());
    }

    removeAttributeValues(models: ProductAttributeValue[]): Observable<any> {
        return this.http.put('/api/productattributevalue', models, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    build(id: number): Observable<any> {
        return this.http.get('/api/product/' + id + '/build', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
