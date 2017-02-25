import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Login, Token } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class AuthenticationService {

    constructor(private router: Router, private http: Http) {
    }

    login(user: Login) : Observable<Token> {
        let body = `username=${user.username}&password=${user.password}`;
        return this.http.post('/api/login', body, { headers: Helpers.getHeaders() })
            .map(response => <Token>response.json());
    }

    loginConsumer(social: String, uniqueID: String) : Observable<Token> {
        let body = `social=${social}&uniqueID=${uniqueID}`;
        return this.http.post('/api/login/consumer', body, { headers: Helpers.getHeaders() })
            .map(response => <Token>response.json());
    }

    register(user: Login) : Observable<Token> {
        let body = `username=${user.username}&password=${user.password}`;
        return this.http.post('/api/register', body, { headers: Helpers.getHeaders() })
            .map(response => <Token>response.json());
    }

    logout() {
        this.http.get('/api/logout', { headers: Helpers.getHeaders() })
            .map((response) => response.json())
            .subscribe(result => {
               this.removeCredentials();
            }, onerror => this.removeCredentials());
    }

    grantCredentials(token: string, redirect: boolean) {
        localStorage.setItem('token', token);
        if (redirect) {
            this.router.navigate(['home']);
        }
    }

    removeCredentials() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }

    get isAuthenticated() : boolean {
        return localStorage.getItem('token') != null;
    }

    checkCredentials() {
        if (!this.isAuthenticated) {
            this.removeCredentials();
        }
        // this.http.get('/api/authenticated', { headers: Helpers.getHeaders() })
        //     .map(response => response.json())
        //     .subscribe(res => {
        //         if (!res.authenticated) {
        //             this.removeCredentials();
        //         }
        //     });
    }

    getCredentials() : Observable<any>  {
        return this.http.get('/api/authenticated', { headers: Helpers.getHeaders() })
            .map(response => response.json());
    }
}
