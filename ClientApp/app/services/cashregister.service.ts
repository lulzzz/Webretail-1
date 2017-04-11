import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CashRegister } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CashRegisterService {

    constructor(private http: Http) {
    }

    getAll(): Observable<CashRegister[]> {
        return this.http.get('/api/cashregister', { headers: Helpers.getHeaders() })
            .map(result => <CashRegister[]>result.json());
    }

    getById(id: number) : Observable<CashRegister> {
        return this.http.get('/api/cashregister/' + id, { headers: Helpers.getHeaders() })
            .map(result => <CashRegister>result.json());
    }

    create(model: CashRegister) : Observable<CashRegister> {
        return this.http.post('/api/cashregister', model, { headers: Helpers.getHeaders() })
            .map(result => <CashRegister>result.json());
    }

    update(id: number, model: CashRegister) : Observable<CashRegister> {
        return this.http.put('/api/cashregister/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <CashRegister>result.json());
    }

    delete(id: number) : Observable<any> {
        return this.http.delete('/api/cashregister/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
