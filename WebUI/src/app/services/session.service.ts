﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Login, Token } from '../shared/models';
import { Helpers } from '../shared/helpers';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService {

    constructor(private router: Router, private http: HttpClient) {
    }

    login(account: Login): Observable<Token> {
        return this.http.post('/api/login', account, { headers: Helpers.getHeaders() })
            .map(response => <Token>response);
    }

    logout() {
        const body = { token: localStorage.getItem('token') };
        this.http.post('/api/logout', body, { headers: Helpers.getHeaders() })
            .map((response) => response)
            .subscribe(result => result);
        this.removeCredentials();
    }

    register(account: Login): Observable<Token> {
        return this.http.post('/api/register', account, { headers: Helpers.getHeaders() })
            .map(response => <Token>response);
    }

    grantCredentials(data: any) {
        localStorage.setItem('uniqueID', data.uniqueID);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.router.navigate(['home']);
    }

    removeCredentials() {
        localStorage.removeItem('uniqueID');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['login']);
    }

    get isAuthenticated(): boolean {
        return localStorage.getItem('token') != null;
    }

    checkCredentials(): boolean {
        if (!this.isAuthenticated) {
            this.removeCredentials();
            return false;
        }
        return true;
    }

    getCredentials(): Observable<any>  {
        return this.http.get('/api/authenticated', { headers: Helpers.getHeaders() })
            .map(response => response);
    }
}
