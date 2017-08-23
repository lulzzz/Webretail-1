import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Category } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CategoryService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Category[]> {
        return this.http.get('/api/category', { headers: Helpers.getHeaders() })
            .map(result => <Category[]>result.json());
    }

    getById(id: number): Observable<Category> {
        return this.http.get('/api/category/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Category>result.json());
    }

    create(model: Category): Observable<Category> {
        return this.http.post('/api/category', model, { headers: Helpers.getHeaders() })
            .map(result => <Category>result.json());
    }

    update(id: number, model: Category): Observable<Category> {
        return this.http.put('/api/category/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Category>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/category/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
