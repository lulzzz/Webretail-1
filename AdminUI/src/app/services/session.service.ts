import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Login, Token } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class SessionService {

    private title: string;
    username: string;
    menuActive: boolean;
    titleSidebar: string;
 
    constructor(private router: Router, private http: Http) {
        this.title = '';
        this.titleSidebar = '';
        this.username = localStorage.getItem('username');
        this.initMenu();
    }

    get visibleSidebar(): boolean { return this.titleSidebar !== '' };

    initMenu() {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        this.menuActive = width > 1024;
    }

    setTitle(title) {
        if (!this.visibleSidebar) {
            this.title = title;
        }
    }

    login(user: Login): Observable<Token> {
        return this.http.post('/api/login', user, { headers: Helpers.getHeaders() })
            .map(response => <Token>response.json());
    }

    logout() {
        const body = { token: localStorage.getItem('token') };
        this.http.post('/api/logout', body, { headers: Helpers.getHeaders() })
            .map((response) => response.json())
            .subscribe(result => this.username = '');
        this.removeCredentials();
    }

    grantCredentials(username: string, data: any) {
        this.username = username;
        localStorage.setItem('username', username);
        localStorage.setItem('uniqueID', data.uniqueID);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.router.navigate(['home']);
    }

    removeCredentials() {
        localStorage.removeItem('username');
        localStorage.removeItem('uniqueID');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['home']);
    }

    get isAuthenticated(): boolean {
        return localStorage.getItem('token') != null && localStorage.getItem('role') !== 'Registry';
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
