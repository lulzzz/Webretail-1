import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../services/authentication.service';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {

    private sub: any;
    token: string;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService
                ) { }

	ngOnInit() {
        // Subscribe to route params
        this.sub = this.activatedRoute.queryParams
            .subscribe(params => {
                let social = params['social'];
                let uniqueID = params['uniqueID'];
                if (social && uniqueID) {
                    this.authenticationService.loginConsumer(social, uniqueID)
                        .subscribe(res => {
                            this.token = res.token;
                            this.authenticationService.grantCredentials(this.token, false);
                        });
                } else {
                    this.token = localStorage.getItem('token');
                }
            });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}
