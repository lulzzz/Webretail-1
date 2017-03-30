import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Discount, DiscountProduct } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class DiscountService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Discount[]> {
        return this.http.get('/api/discount', { headers: Helpers.getHeaders() })
            .map(result => <Discount[]>result.json());
    }

    getById(id: number) : Observable<Discount> {
        return this.http.get('/api/discount/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Discount>result.json());
    }

    getProductsById(id: number): Observable<DiscountProduct[]> {
        return this.http.get('/api/discount/' + id + '/product', { headers: Helpers.getHeaders() })
            .map(result => <DiscountProduct[]>result.json());
    }

    getByProductId(productId: number) : Observable<Discount> {
        return this.http.get('/api/product/' + productId + '/discount', { headers: Helpers.getHeaders() })
            .map(result => <Discount>result.json());
    }

    create(model: Discount) : Observable<Discount> {
        return this.http.post('/api/discount', model, { headers: Helpers.getHeaders() })
            .map(result => <Discount>result.json());
    }

    update(id: number, model: Discount) : Observable<Discount> {
        return this.http.put('/api/discount/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Discount>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/discount/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    addProduct(model: DiscountProduct) : Observable<DiscountProduct> {
        return this.http.post('/api/discountproduct', model, { headers: Helpers.getHeaders() })
            .map(result => <DiscountProduct>result.json());
    }

    removeProduct(id: number) : Observable<any> {
        return this.http.delete('/api/discountproduct/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
