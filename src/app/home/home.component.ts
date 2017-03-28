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
                private authenticationService: AuthenticationService) { }

	ngOnInit() {

        if (this.authenticationService.isAuthenticated) {
            this.token = localStorage.getItem('token');
            return;
        }

        // this.authenticationService.getCredentials()
        //     .subscribe(res => {
        //         alert(JSON.stringify(res));
        //     });

        this.activatedRoute.queryParams
            .subscribe(params => {
                let consumer = params['consumer'];
                let uniqueID = params['uniqueID'];
                if (consumer && uniqueID) {
                    this.authenticationService.loginConsumer(consumer, uniqueID)
                        .subscribe(res => {
                            this.token = res.token;
                            this.authenticationService.grantCredentials(res.token, res.role);
                        });
                }
            })
            .unsubscribe();
     }
}
