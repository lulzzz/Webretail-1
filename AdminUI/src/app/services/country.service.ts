import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Store } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CountryService {

    constructor(private http: Http) {
    }

    get(): Observable<Country[]> {
        return this.http.get('https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;currencies;timezones')
            .map(result => <Country[]>result.json());
    }
}

export interface Country {
    alpha3Code: string;
    name: string;
    currencies: Currency[];
    timezones: string[];
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}
