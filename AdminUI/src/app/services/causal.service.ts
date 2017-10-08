import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Causal } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CausalService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Causal[]> {
        return this.http.get('/api/causal', { headers: Helpers.getHeaders() })
            .map(result => <Causal[]>result.json());
    }

    getById(id: number): Observable<Causal> {
        return this.http.get('/api/causal/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Causal>result.json());
    }

    create(model: Causal): Observable<Causal> {
        return this.http.post('/api/causal', model, { headers: Helpers.getHeaders() })
            .map(result => <Causal>result.json());
    }

    update(id: number, model: Causal): Observable<Causal> {
        return this.http.put('/api/causal/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Causal>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/causal/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
