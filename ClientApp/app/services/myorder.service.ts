import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MyOrder, MyOrderArticle, OrderStatus } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class MyOrderService {

    constructor(private http: Http) {
    }

    getAll(): Observable<MyOrder[]> {
        return this.http.get('/api/myorder', { headers: Helpers.getHeaders() })
            .map(result => <MyOrder[]>result.json());
    }

    getById(id: number) : Observable<MyOrder> {
        return this.http.get('/api/myorder/' + id, { headers: Helpers.getHeaders() })
            .map(result => <MyOrder>result.json());
    }

    create(model: MyOrder) : Observable<MyOrder> {
        return this.http.post('/api/myorder', model, { headers: Helpers.getHeaders() })
            .map(result => <MyOrder>result.json());
    }

    update(id: number, model: MyOrder) : Observable<MyOrder> {
        return this.http.put('/api/myorder/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <MyOrder>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/myorder/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getItemsById(orderId: number) : Observable<MyOrderArticle[]> {
        return this.http.get('/api/myorderarticle/' + orderId, { headers: Helpers.getHeaders() })
            .map(result => <MyOrderArticle[]>result.json());
    }

    createItem(model: MyOrderArticle) : Observable<MyOrderArticle> {
        return this.http.post('/api/myorderarticle', model, { headers: Helpers.getHeaders() })
            .map(result => <MyOrderArticle>result.json());
    }

    updateItem(id: number, model: MyOrderArticle) : Observable<MyOrderArticle> {
        return this.http.put('/api/myorderarticle/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <MyOrderArticle>result.json());
    }

    deleteItem(id: number) : Observable<any> {
        return this.http.delete('/api/myorderarticle/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    commit(orderId: number) : Observable<any> {
        return this.http.get('/api/myorder/' + orderId + '/commit', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    roolback(orderId: number) : Observable<any> {
        return this.http.get('/api/myorder/' + orderId + '/roolback', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getStatus(): Observable<OrderStatus[]> {
        return this.http.get('/api/orderstatus', { headers: Helpers.getHeaders() })
            .map(result => <OrderStatus[]>result.json());
    }
}
