import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Invoice, Movement, MovementArticle, ItemValue } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class InvoiceService {

    constructor(private http: Http) {
    }

    getPayments(): Observable<ItemValue[]> {
        return this.http.get('/api/invoicepayment', { headers: Helpers.getHeaders() })
            .map(result => <ItemValue[]>result.json());
    }

    getAll(): Observable<Invoice[]> {
        return this.http.get('/api/invoice', { headers: Helpers.getHeaders() })
            .map(result => <Invoice[]>result.json());
    }

    getById(id: number): Observable<Invoice> {
        return this.http.get('/api/invoice/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Invoice>result.json());
    }

    create(model: Invoice): Observable<Invoice> {
        return this.http.post('/api/invoice', model, { headers: Helpers.getHeaders() })
            .map(result => <Invoice>result.json());
    }

    update(id: number, model: Invoice): Observable<Invoice> {
        return this.http.put('/api/invoice/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Invoice>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/invoice/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getMovementsById(id: number): Observable<Movement[]> {
        return this.http.get('/api/invoicemovement/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Movement[]>result.json());
    }

    getMovementArticlesById(id: number): Observable<MovementArticle[]> {
        return this.http.get('/api/invoicemovementarticle/' + id, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle[]>result.json());
    }

    addMovement(id: number, movementId: number): Observable<any> {
        let json = <ItemValue>{ value: movementId.toString() };
        return this.http.post('/api/invoicemovement/' + id, json,
            { headers: Helpers.getHeaders() }).map(result => result.json());
    }

    removeMovement(id: number): Observable<any> {
        return this.http.delete('/api/invoicemovement/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
