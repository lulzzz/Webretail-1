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

    getById(id: number): Observable<Customer> {
        return this.http.get('/api/ecommerce/customer', { headers: Helpers.getHeaders() })
            .map(result => <Customer>result);
    }

    update(id: number, model: Customer): Observable<Customer> {
        return this.http.put('/api/ecommerce/customer', model, { headers: Helpers.getHeaders() })
            .map(result => <Customer>result);
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/ecommerce/customer', { headers: Helpers.getHeaders() })
            .map(result => result);
    }
}
