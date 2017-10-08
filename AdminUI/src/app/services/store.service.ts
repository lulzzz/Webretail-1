import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Store } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class StoreService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Store[]> {
        return this.http.get('/api/store', { headers: Helpers.getHeaders() })
            .map(result => <Store[]>result.json());
    }

    getById(id: number): Observable<Store> {
        return this.http.get('/api/store/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Store>result.json());
    }

    create(model: Store): Observable<Store> {
        return this.http.post('/api/store', model, { headers: Helpers.getHeaders() })
            .map(result => <Store>result.json());
    }

    update(id: number, model: Store): Observable<Store> {
        return this.http.put('/api/store/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Store>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/store/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
