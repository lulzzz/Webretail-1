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

    logout() {
        this.http.get('/api/logout', { headers: Helpers.getHeaders() })
            .map((response) => response.json())
            .subscribe(result => {
               this.removeCredentials();
            });
    }

    grantCredentials(token: string, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        this.router.navigate(['home']);
    }

    removeCredentials() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['login']);
    }

    get isAuthenticated() : boolean {
        return localStorage.getItem('token') != null;
    }

    checkCredentials(local: boolean) {
        if (local) {
            if (!this.isAuthenticated) {
                this.removeCredentials();
            }
            return;
        } else {
            this.http.get('/api/authenticated', { headers: Helpers.getHeaders() })
                .map(response => response.json())
                .subscribe(authenticated => {
                    if (!authenticated) {
                        this.removeCredentials();
                    }
                });
        }
    }
}
