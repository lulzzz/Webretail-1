import { Component } from '@angular/core';
import { AuthenticationService } from './../../../../services/authentication.service';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    constructor(private authenticationService: AuthenticationService) {
    }
}