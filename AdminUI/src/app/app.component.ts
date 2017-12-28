import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SessionService } from './services/session.service';
import { Helpers } from './shared/helpers';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
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

export class AppComponent {
    constructor(public sessionService: SessionService) {
        if (this.sessionService.isAuthenticated) {
            this.sessionService.getSetting()
                .subscribe(result => {
                    Helpers.setInfos(result);
                }, onerror => console.log(onerror)
            );
        }
    }

    get menuActive(): boolean { return this.sessionService.menuActive; }
}
