import { Component, OnInit  } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit  {

    token: string;

    constructor() {
    }

	ngOnInit() {
        this.token = localStorage.getItem('token');
    }
}
