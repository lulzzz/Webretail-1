import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Customer } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CustomerService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Customer[]> {
        return this.http.get('/api/customer', { headers: Helpers.getHeaders() })
            .map(result => <Customer[]>result.json());
    }

    getById(id: number) : Observable<Customer> {
        return this.http.get('/api/customer/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result.json());
    }

    create(model: Customer) : Observable<Customer> {
        return this.http.post('/api/customer', model, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result.json());
    }

    update(id: number, model: Customer) : Observable<Customer> {
        return this.http.put('/api/customer/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/customer/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
