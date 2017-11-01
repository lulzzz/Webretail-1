import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Basket } from '../shared/models';

@Injectable()
export class BasketService {

    constructor(private http: HttpClient) {
    }

    get(): Observable<Basket[]> {
        return this.http.get<Basket[]>('/api/ecommerce/basket');
    }

    create(model: Basket): Observable<Basket> {
        return this.http.post<Basket>('/api/ecommerce/basket', model);
    }

    update(id: number, model: Basket): Observable<Basket> {
        return this.http.put<Basket>('/api/ecommerce/basket/' + id, model);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>('/api/ecommerce/basket/' + id);
    }
}
