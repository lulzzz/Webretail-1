import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Movement, MovementArticle, Item, ItemValue, Cost, Period } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class MovementService {

    movements: Movement[];

    constructor(private http: Http) {
    }

    getAll(): Observable<Movement[]> {
        return this.http.get('/api/movement', { headers: Helpers.getHeaders() })
            .map(result => <Movement[]>result.json());
    }

    getSales(period: Period): Observable<MovementArticle[]> {
        return this.http.post('/api/movementsales', period, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle[]>result.json());
    }

    getReceipted(period: Period): Observable<Movement[]> {
        return this.http.post('/api/movementreceipted', period, { headers: Helpers.getHeaders() })
            .map(result => <Movement[]>result.json());
    }

    findById(id: number): Movement {
        return this.movements.find(p => p.movementId === id);
    }

    getById(id: number): Observable<Movement> {
        return this.http.get('/api/movement/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    getByRegistryId(id: number): Observable<Movement[]> {
        return this.http.get('/api/movementregistry/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Movement[]>result.json());
    }

    create(model: Movement): Observable<Movement> {
        return this.http.post('/api/movement', model, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    clone(id: number): Observable<Movement> {
        return this.http.post('/api/movement/' + id, null, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    update(id: number, model: Movement): Observable<Movement> {
        return this.http.put('/api/movement/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/movement/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getItemsById(movementId: number): Observable<MovementArticle[]> {
        return this.http.get('/api/movementarticle/' + movementId, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle[]>result.json());
    }

    createItem(model: MovementArticle, price: string): Observable<MovementArticle> {
        return this.http.post('/api/movementarticle/' + price, model, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle>result.json());
    }

    updateItem(id: number, model: MovementArticle): Observable<MovementArticle> {
        return this.http.put('/api/movementarticle/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle>result.json());
    }

    deleteItem(id: number): Observable<any> {
        return this.http.delete('/api/movementarticle/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getStatus(): Observable<ItemValue[]> {
        return this.http.get('/api/movementstatus', { headers: Helpers.getHeaders() })
            .map(result => <ItemValue[]>result.json());
    }

    getPayments(): Observable<Item[]> {
        return this.http.get('/api/movementpayment', { headers: Helpers.getHeaders() })
            .map(result => <Item[]>result.json());
    }

    getShippings(): Observable<Item[]> {
        return this.http.get('/api/movementshipping', { headers: Helpers.getHeaders() })
            .map(result => <Item[]>result.json());
    }

    getShippingCost(id: string): Observable<Cost> {
        return this.http.get('/api/movement/' + id + '/cost', { headers: Helpers.getHeaders() })
            .map(result => <Cost>result.json());
    }

    getBarcode(movementId: number): Observable<Blob> {
        return this.http.get('/api/pdf/barcode/' + movementId, { headers: Helpers.getHeaders(), responseType: ResponseContentType.Blob })
            .map(result => <Blob>result.blob());
    }
}
