import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Basket, Movement, PayPal, Item, Order, Cost } from '../shared/models';

@Injectable()
export class BasketService {

	public basket: Basket[];

    constructor(private http: HttpClient) {
        this.basket = [];
    }

    get count(): number {
        return this.basket.length > 0
            ? this.basket.map(p => p.basketQuantity).reduce((sum, current) => sum + current)
            : 0;
    }

    get(registryId: string): Observable<Basket[]> {
        return this.http.get<Basket[]>('/api/ecommerce/basket/' + registryId);
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

    getPayments(): Observable<Item[]> {
        return this.http.get<Item[]>('/api/ecommerce/payment');
    }

    getShippings(): Observable<Item[]> {
        return this.http.get<Item[]>('/api/ecommerce/shipping');
    }

    getPayPal(): Observable<PayPal> {
        return this.http.get<PayPal>('/api/ecommerce/paypal');
    }

    getShippingCost(id: string): Observable<Cost> {
        return this.http.get<Cost>('/api/ecommerce/shipping/' + id + '/cost');
    }

    commit(order: Order): Observable<Movement> {
        return this.http.post<Movement>('/api/ecommerce/order', order);
    }
}
