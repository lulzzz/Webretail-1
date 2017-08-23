import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Helpers } from '../shared/helpers';

@Injectable()
export class StatisticService {

    constructor(private http: Http) {
    }

    getUseByDeviceAsync(): Observable<any> {
        return this.http.get('/api/statistic/device', { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }

    getCategoryByYearAsync(year: number): Observable<any> {
        return this.http.get('/api/statistic/category/' + year, { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }

    getCategoryForMonthByYearAsync(year: number): Observable<any> {
        return this.http.get('/api/statistic/categoryformonth/' + year, { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }

    getProductByYearAsync(year: number): Observable<any> {
        return this.http.get('/api/statistic/product/' + year, { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }

    getProductForMonthByYearAsync(year: number): Observable<any> {
        return this.http.get('/api/statistic/productformonth/' + year, { headers: Helpers.getHeaders() })
            .map(result => <any>result.json());
    }
}
