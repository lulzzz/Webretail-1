import { Component } from '@angular/core';
import { SessionService } from './../services/session.service';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {

    constructor(public sessionService: SessionService) {
    }

    get isAuthenticated(): boolean {
        return this.sessionService.isAuthenticated;
    }

    get isAdmin(): boolean {
        return this.sessionService.isAdmin;
    }

    logoutClick() {
        this.sessionService.logout();
    }
}