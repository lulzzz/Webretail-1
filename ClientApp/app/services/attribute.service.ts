import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Attribute, AttributeValue } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class AttributeService {

    constructor(private http: Http) { }

    getAll(): Observable<Attribute[]> {
        return this.http.get('/api/attribute', { headers: Helpers.getHeaders() })
            .map(result => <Attribute[]>result.json());
    }

    getById(id: number): Observable<Attribute> {
        return this.http.get('/api/attribute/' + id, { headers: Helpers.getHeaders() })
            .map(result => <Attribute>result.json());
    }

    create(model: Attribute): Observable<Attribute> {
        return this.http.post('/api/attribute', model, { headers: Helpers.getHeaders() })
            .map(result => <Attribute>result.json());
    }

    update(id: number, model: Attribute): Observable<Attribute> {
        return this.http.put('/api/attribute/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <Attribute>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/attribute/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getValueAll(): Observable<AttributeValue[]> {
        return this.http.get('/api/attributevalue', { headers: Helpers.getHeaders() })
            .map(result => <AttributeValue[]>result.json());
    }

    getValueByAttributeId(id: number): Observable<AttributeValue[]> {
        return this.http.get('/api/attribute/' + id + '/value', { headers: Helpers.getHeaders() })
            .map(result => <AttributeValue[]>result.json());
    }

    getValueById(id: number): Observable<AttributeValue> {
        return this.http.get('/api/attributevalue/' + id, { headers: Helpers.getHeaders() })
            .map(result => <AttributeValue>result.json());
    }

    createValue(model: AttributeValue): Observable<AttributeValue> {
        return this.http.post('/api/attributevalue', model, { headers: Helpers.getHeaders() })
            .map(result => <AttributeValue>result.json());
    }

    updateValue(id: number, model: AttributeValue): Observable<AttributeValue> {
        return this.http.put('/api/attributevalue/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <AttributeValue>result.json());
    }

    deleteValue(id: number): Observable<any> {
        return this.http.delete('/api/attributevalue/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
