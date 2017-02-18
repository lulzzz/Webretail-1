import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Account } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class AccountService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Account[]> {
        return this.http.get('/api/account', { headers: Helpers.getHeaders() }).map(result => <Account[]>result.json());
    }

    getById(id: number) : Observable<Account> {
        return this.http.get('/api/account/' + id, { headers: Helpers.getHeaders() }).map(result => <Account>result.json());
    }

    create(model: Account) : Observable<Account> {
        return this.http.post('/api/account', model, { headers: Helpers.getHeaders() }).map(result => <Account>result.json());
    }

    update(id: number, model: Account) : Observable<any> {
        return this.http.put('/api/account/' + id, model, { headers: Helpers.getHeaders() }).map(result => result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/account/' + id, { headers: Helpers.getHeaders() }).map(result => result.json());
    }
}
