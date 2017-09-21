import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class ImportService {

    apiRoot: String = 'http://www.tessilnova.com';

    constructor(private http: Http) {
    }

    getProducts(): Observable<Translate[]> {
        let apiURL = `${this.apiRoot}/api/codart/products`;
        return this.http.get(apiURL, { headers: Helpers.getHeaders() })
            .map(result => <Translate[]>result.json());
    }

    getProductById(id: String): Observable<CodartInfo> {
        let apiURL = `${this.apiRoot}/api/codart/${id}`;
        return this.http.get(apiURL, { headers: Helpers.getHeaders() })
            .map(result => <CodartInfo>result.json());
    }

    create(model: Product): Observable<Product> {
        return this.http.post('/api/product/import', model, { headers: Helpers.getHeaders() })
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
    barcode: string;
    colorId: string;
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
