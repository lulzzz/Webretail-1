import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Device } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class DeviceService {

    constructor(private http: Http) {
    }

    getAll(): Observable<Device[]> {
        return this.http.get('/api/device', { headers: Helpers.getHeaders() })
            .map(result => <Device[]>result.json());
    }

    getById(id: number): Observable<Device> {
        return this.http.get('/api/device/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Device>result.json());
    }

    create(model: Device): Observable<Device> {
        return this.http.post('/api/device', model, { headers: Helpers.getHeaders() })
            .map(result => <Device>result.json());
    }

    update(id: number, model: Device): Observable<Device> {
        return this.http.put('/api/device/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Device>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/device/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
