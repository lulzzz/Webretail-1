import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Movement } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class MovementService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Movement[]> {
        return this.http.get('/api/movement', { headers: Helpers.getHeaders() })
            .map(result => <Movement[]>result.json());
    }

    getById(id: number) : Observable<Movement> {
        return this.http.get('/api/movement/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    create(model: Movement) : Observable<Movement> {
        return this.http.post('/api/movement', model, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    update(id: number, model: Movement) : Observable<Movement> {
        return this.http.put('/api/movement/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Movement>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/movement/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
