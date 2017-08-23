import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {

    token: string;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService) {
        authenticationService.title = 'Home';
    }

    ngOnInit() {

        if (this.authenticationService.isAuthenticated) {
            this.token = localStorage.getItem('token');
            return;
        }

        // this.authenticationService.getCredentials()
        //     .subscribe(res => {
        //         alert(JSON.stringify(res));
        //     });
     }
}
