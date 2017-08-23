import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Company, Email } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CompanyService {

    constructor(private http: Http) {
    }

    get(): Observable<Company> {
        return this.http.get('/api/company', { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }

    create(model: Company): Observable<Company> {
        return this.http.post('/api/company', model, { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }

    update(model: Company): Observable<Company> {
        return this.http.put('/api/company', model, { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }
}
