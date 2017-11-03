import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Customer, Movement, MovementArticle } from '../shared/models';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getById(id: number): Observable<Customer> {
        return this.http.get<Customer>('/api/ecommerce/customer');
    }

    update(id: number, model: Customer): Observable<Customer> {
        return this.http.put<Customer>('/api/ecommerce/customer', model);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>('/api/ecommerce/customer');
    }

    getOrders(): Observable<Movement[]> {
        return this.http.get<Movement[]>('/api/ecommerce/order');
    }

    getOrderById(id: number): Observable<Movement> {
        return this.http.get<Movement>('/api/ecommerce/order/' + id);
    }

    getItemsById(id: number): Observable<MovementArticle[]> {
        return this.http.get<MovementArticle[]>('/api/ecommerce/order/' + id + '/items');
    }
}
