import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Registry } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class RegistryService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Registry[]> {
        return this.http.get('/api/registry', { headers: Helpers.getHeaders() })
            .map(result => <Registry[]>result.json());
    }

    getById(id: number): Observable<Registry> {
        return this.http.get('/api/registry/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Registry>result.json());
    }

    create(model: Registry): Observable<Registry> {
        return this.http.post('/api/registry', model, { headers: Helpers.getHeaders() })
            .map(result => <Registry>result.json());
    }

    update(id: number, model: Registry): Observable<Registry> {
        return this.http.put('/api/registry/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Registry>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/registry/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
