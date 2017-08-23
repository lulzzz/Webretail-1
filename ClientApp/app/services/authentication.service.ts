import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Login, Token } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class AuthenticationService {

    title: string;

    constructor(private router: Router, private http: Http) {
        this.title = '';
    }

    login(user: Login): Observable<Token> {
        let body = { username: user.username, password: user.password };
        return this.http.post('/api/login', body, { headers: Helpers.getHeaders() })
            .map(response => <Token>response.json());
    }

    logout() {
        let body = { token: localStorage.getItem('token') };
        this.http.post('/api/logout', body, { headers: Helpers.getHeaders() })
            .map((response) => response.json())
            .subscribe(result => result);
        this.removeCredentials();
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
        this.router.navigate(['home']);
    }

    get isAuthenticated(): boolean {
        return localStorage.getItem('token') != null;
    }

    get isAdmin(): boolean {
        return localStorage.getItem('role') === 'Admin';
    }

    checkCredentials(isAdmin: boolean) {
        if (!this.isAuthenticated || isAdmin && !this.isAdmin) {
            this.removeCredentials();
        }
    }

    getCredentials(): Observable<any>  {
        return this.http.get('/api/authenticated', { headers: Helpers.getHeaders() })
            .map(response => response.json());
    }
}
