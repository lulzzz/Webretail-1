import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Order, OrderArticle } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class OrderService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Order[]> {
        return this.http.get('/api/order', { headers: Helpers.getHeaders() })
            .map(result => <Order[]>result.json());
    }

    getById(id: number) : Observable<Order> {
        return this.http.get('/api/order/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Order>result.json());
    }

    create(model: Order) : Observable<Order> {
        return this.http.post('/api/order', model, { headers: Helpers.getHeaders() })
            .map(result => <Order>result.json());
    }

    update(id: number, model: Order) : Observable<Order> {
        return this.http.put('/api/order/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Order>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/order/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getItemsById(orderId: number) : Observable<OrderArticle[]> {
        return this.http.get('/api/movementarticle/' + orderId, { headers: Helpers.getHeaders() })
            .map(result => <OrderArticle[]>result.json());
    }

    createItem(model: OrderArticle) : Observable<OrderArticle> {
        return this.http.post('/api/orderarticle', model, { headers: Helpers.getHeaders() })
            .map(result => <OrderArticle>result.json());
    }

    updateItem(id: number, model: OrderArticle) : Observable<OrderArticle> {
        return this.http.put('/api/orderarticle/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <OrderArticle>result.json());
    }

    deleteItem(id: number) : Observable<any> {
        return this.http.delete('/api/orderarticle/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    commit(orderId: number) : Observable<any> {
        return this.http.get('/api/order/' + orderId + '/commit', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    roolback(orderId: number) : Observable<any> {
        return this.http.get('/api/order/' + orderId + '/roolback', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
