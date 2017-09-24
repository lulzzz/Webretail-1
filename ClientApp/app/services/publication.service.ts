﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SelectItem } from 'primeng/primeng';
import { Product, Media, Translation, Publication } from '../shared/models'
import { Helpers } from '../shared/helpers'

@Injectable()
export class PublicationService {

    public publication: Publication;
    public product: Product;

    constructor(private http: Http) {
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get('api/product/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    saveProduct(): Observable<Product> {
        return this.http.post('api/product/' + this.product.productId + '/publication', this.product, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    getById(id: number): Observable<Publication> {
        return this.http.get('/api/publication/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Publication>result.json());
    }

    create(model: Publication): Observable<Publication> {
        return this.http.post('/api/publication', model, { headers: Helpers.getHeaders() })
            .map(result => <Publication>result.json());
    }

    update(id: number, model: Publication): Observable<Publication> {
        return this.http.put('/api/publication/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Publication>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/publication/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    get translateDescriptions(): Translation[] { return this.product.translations; }
    get translateAttributes(): Translation[] {
        let items: Translation[] = [];
        this.product.attributes.forEach(p => {
            p.attribute.translations.map(t => items.push(t));
            p.attributeValues.forEach(v => v.attributeValue.translations.map(t => items.push(t)))
        });
        return items;
    }
    get published() { return this.publication != null; }

    get step1() { return this.product.translations.length === 2 ? 'Completed' : 'In progress'; }
    get step2() { return this.product.categories.map(p => p.category.translations.length === 2) ? 'Completed' : 'In progress'; }
    get step4() { return this.product.medias.length > 0 ? 'Completed' : 'In progress'; }

    getStatus(): string {
        if (this.step1 !== 'Completed') {
            return 'step 1';
        } else if (this.step2 !== 'Completed') {
            return 'step 2';
        } else if (this.step4 !== 'Completed') {
            return 'step 4';
        }
        return 'Completed';
    }

    getCategories(): SelectItem[] {
        return this.product.categories.map(p => Helpers.newSelectItem(p.category.categoryName));
    }

    getAttributes(): SelectItem[] {
        let items: SelectItem[] = [];
        this.product.attributes.forEach(p => {
            items.push(Helpers.newSelectItem(p.attribute.attributeName));
            p.attributeValues.forEach(v => items.push(Helpers.newSelectItem(v.attributeValue.attributeValueName)))
        });
        return items;
    }

    getTranslate(array, code, key): Translation {
        return array.find(p => p.code === code && p.key === key);
    }

    addTranslate(array, item) {
        array.push(item);
    }

    updateTranslate(array, item) {
        let translate = this.getTranslate(array, item.country, item.key);
        translate.value = item.value;
    }

    deleteTranslate(array, item) {
        let index = array.indexOf(item);
        array.splice(index, 1);
    }

    addMedia(item) {
        this.product.medias.push(item);
    }

    updateMedia(item) {
        let media = this.product.medias.find(p => p.name === item.name);
        media.number = item.number;
    }

    deleteMedia(item) {
        let index = this.product.medias.indexOf(item);
        this.product.medias.splice(index, 1);
    }
}
