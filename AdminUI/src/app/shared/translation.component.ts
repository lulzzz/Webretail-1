import { Component, OnInit } from '@angular/core';
import { Translation } from './../shared/models';
import { SessionService } from './../services/session.service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-translation',
    templateUrl: 'translation.component.html'
})

export class TranslationComponent implements OnInit {

    countries: SelectItem[];
    translation: Translation;
    translations: Translation[];

    constructor(private sessionService: SessionService) {
        this.countries = [];
        this.countries.push({label: 'English', value: 'EN'});
        this.countries.push({label: 'Italian', value: 'IT'});
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.translation = new Translation(this.countries[0].value, '');
        this.translations = [];
    }
}
