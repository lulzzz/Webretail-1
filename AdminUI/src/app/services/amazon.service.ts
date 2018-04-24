import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MwsRequest, MwsConfig } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class AmazonService {

    constructor(private http: Http) {
    }

    getConfig(): Observable<MwsConfig> {
        return this.http.get('/api/mws/config', { headers: Helpers.getHeaders() })
            .map(result => <MwsConfig>result.json());
    }

    updateConfig(config: MwsConfig): Observable<MwsConfig> {
        return this.http.put('/api/mws/config', config, { headers: Helpers.getHeaders() })
            .map(result => <MwsConfig>result.json());
    }

    get(): Observable<MwsRequest[]> {
        return this.http.get('/api/mws', { headers: Helpers.getHeaders() })
            .map(result => <MwsRequest[]>result.json());
    }

    getByRange(start: number, finish: number): Observable<MwsRequest[]> {
        return this.http.get('/api/mws/' + start + '/' + finish, { headers: Helpers.getHeaders() })
            .map(result => <MwsRequest[]>result.json());
    }

    delete(id: string): Observable<any> {
        return this.http.delete('/api/mws/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
