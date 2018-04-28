import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SessionService } from './services/session.service';
import { Helpers } from './shared/helpers';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
  })

export class AppComponent implements OnInit {
    constructor(public sessionService: SessionService) { }

    get menuActive(): boolean { return this.sessionService.menuActive; }

    ngOnInit() {
        if (this.sessionService.isAuthenticated) {
            this.sessionService.getSetting()
                .subscribe(result => {
                    Helpers.setInfos(result);
                }, onerror => console.log(onerror)
            );
        }
    }
}
