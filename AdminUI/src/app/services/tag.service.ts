import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TagGroup, TagValue } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class TagService {

    constructor(private http: Http) { }

    get(): Observable<TagGroup[]> {
        return this.http.get('/api/tag', { headers: Helpers.getHeaders() })
            .map(result => <TagGroup[]>result.json());
    }

    getAll(): Observable<TagGroup[]> {
        return this.http.get('/api/tag/all', { headers: Helpers.getHeaders() })
            .map(result => <TagGroup[]>result.json());
    }

    getById(id: number): Observable<TagGroup> {
        return this.http.get('/api/tag/' + id, { headers: Helpers.getHeaders() })
            .map(result => <TagGroup>result.json());
    }

    create(model: TagGroup): Observable<TagGroup> {
        return this.http.post('/api/tag', model, { headers: Helpers.getHeaders() })
            .map(result => <TagGroup>result.json());
    }

    update(id: number, model: TagGroup): Observable<TagGroup> {
        return this.http.put('/api/tag/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <TagGroup>result.json());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/tag/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }

    getValueAll(): Observable<TagValue[]> {
        return this.http.get('/api/tagvalue', { headers: Helpers.getHeaders() })
            .map(result => <TagValue[]>result.json());
    }

    getValueByTagId(id: number): Observable<TagValue[]> {
        return this.http.get('/api/tag/' + id + '/value', { headers: Helpers.getHeaders() })
            .map(result => <TagValue[]>result.json());
    }

    getValueById(id: number): Observable<TagValue> {
        return this.http.get('/api/tagvalue/' + id, { headers: Helpers.getHeaders() })
            .map(result => <TagValue>result.json());
    }

    createValue(model: TagValue): Observable<TagValue> {
        return this.http.post('/api/tagvalue', model, { headers: Helpers.getHeaders() })
            .map(result => <TagValue>result.json());
    }

    updateValue(id: number, model: TagValue): Observable<TagValue> {
        return this.http.put('/api/tagvalue/' + id, model, { headers: Helpers.getHeaders() })
            .map(result => <TagValue>result.json());
    }

    deleteValue(id: number): Observable<any> {
        return this.http.delete('/api/tagvalue/' + id, { headers: Helpers.getHeaders() })
            .map(result => result.json());
    }
}
