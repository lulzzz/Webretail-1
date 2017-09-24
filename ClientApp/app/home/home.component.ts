import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './../services/session.service';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {

    token: string;

    constructor(private activatedRoute: ActivatedRoute,
                private sessionService: SessionService) {
        sessionService.title = 'Home';
    }

    ngOnInit() {

        if (this.sessionService.isAuthenticated) {
            this.token = localStorage.getItem('token');
            return;
        }

        // this.sessionService.getCredentials()
        //     .subscribe(res => {
        //         alert(JSON.stringify(res));
        //     });
     }
}
