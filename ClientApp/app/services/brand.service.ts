import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Brand } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class BrandService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Brand[]> {
        return this.http.get('/api/brand', { headers: Helpers.getHeaders() })
            .map(result => <Brand[]>result.json());
    }

    getById(id: number): Observable<Brand> {
        return this.http.get('/api/brand/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Brand>result.json());
    }

    create(model: Brand): Observable<Brand> {
        return this.http.post('/api/brand', model, { headers: Helpers.getHeaders() })
            .map(result => <Brand>result.json());
    }

    update(id: number, model: Brand): Observable<Brand> {
        return this.http.put('/api/brand/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Brand>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/brand/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
