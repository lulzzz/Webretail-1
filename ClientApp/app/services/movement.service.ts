﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Movement, MovementArticle } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class MovementService {

    constructor(private http: Http) {
    }

    getAll(committed: boolean): Observable<Movement[]> {
        let url = '/api/movement';
        if (committed) {
            url += 'committed';
        }
        return this.http.get(url, { headers: Helpers.getHeaders() })
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

    getItemsById(movementId: number) : Observable<MovementArticle[]> {
        return this.http.get('/api/movementarticle/' + movementId, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle[]>result.json());
    }

    createItem(model: MovementArticle) : Observable<MovementArticle> {
        return this.http.post('/api/movementarticle', model, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle>result.json());
    }

    updateItem(id: number, model: MovementArticle) : Observable<MovementArticle> {
        return this.http.put('/api/movementarticle/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <MovementArticle>result.json());
    }

    deleteItem(id: number) : Observable<any> {
        return this.http.delete('/api/movementarticle/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    commit(movementId: number) : Observable<any> {
        return this.http.get('/api/movement/' + movementId + '/commit', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    roolback(movementId: number) : Observable<any> {
        return this.http.get('/api/movement/' + movementId + '/roolback', { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
