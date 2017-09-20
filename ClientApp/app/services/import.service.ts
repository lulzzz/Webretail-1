import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class ImportService {

    domain: String = 'http://www.tessilnova.com';

    constructor(private http: Http) {
    }

    getProductById(id: number): Observable<CodartInfo> {
        return this.http.get(this.domain + '/api/codart/' + id)
            .map(result => <CodartInfo>result.json());
    }

    getProductByName(name: String): Observable<CodartInfo> {
        return this.http.get(this.domain + '/api/codart/name/' + name)
            .map(result => <CodartInfo>result.json());
    }

    createProduct(model: Product): Observable<Product> {
        return this.http.post('/api/product', model, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }

    updateProduct(model: Product): Observable<Product> {
        return this.http.put('/api/product', model, { headers: Helpers.getHeaders() })
            .map(result => <Product>result.json());
    }
}

export interface CodartInfo {
    id: string;
    name: string;
    desc: string;
    price: number;
    discount: number;
    producer: Producer;
    category: Category;
    subcategory: Category;
    featured: boolean;
    published: Date;
    codarts: Codart[];
    medias: Media[];
    translates: Translate[];
}

export interface Category {
    id: string;
    desc: string;
    translates: Translate[];
}

export interface Producer {
    id: string;
    desc: string;
}

export interface Codart {
    id: number;
    color: string;
    size: string;
}

export interface Media {
    id: number;
    codartCode: string;
    filename: string;
    number: number;
    url: string;
}

export interface Translate {
    id: number;
    key: string;
    code: string;
    value: string;
}
