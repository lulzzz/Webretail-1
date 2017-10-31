import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Customer } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Customer[]> {
        return this.http.get('/api/customer', { headers: Helpers.getHeaders() })
            .map(result => <Customer[]>result);
    }

    getById(id: number): Observable<Customer> {
        return this.http.get('/api/customer/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result);
    }

    create(model: Customer): Observable<Customer> {
        return this.http.post('/api/customer', model, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result);
    }

    update(id: number, model: Customer): Observable<Customer> {
        return this.http.put('/api/customer/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result);
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/customer/' + id, { headers: Helpers.getHeaders() })
            .map(result => result);
    }
}
