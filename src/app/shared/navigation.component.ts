import { Component } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {

    constructor(private authenticationService: AuthenticationService) {
    }

    get isAuthenticated() : boolean {
        return this.authenticationService.isAuthenticated;
    }

    get isAdmin() : boolean {
        return this.authenticationService.isAdmin;
    }

    logoutClick() {
        this.authenticationService.logout();
    }
}