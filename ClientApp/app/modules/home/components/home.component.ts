import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from './../../../services/authentication.service';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {

    token: string;

    constructor(private authenticationService: AuthenticationService) {
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.token = localStorage.getItem('token');
    }
}
