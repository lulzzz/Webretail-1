import { Component, OnInit, Input, Output } from '@angular/core';
import { Translation } from './../shared/models';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-translation',
    templateUrl: 'translation.component.html'
})

export class TranslationComponent implements OnInit {
    @Output() @Input() translations: Translation[];
    country: string;
    countries: SelectItem[];
    translation: Translation;

    constructor() {
        this.countries = [];
        this.countries.push({label: 'Italian', value: 'IT'});
        this.countries.push({label: 'English', value: 'EN'});
    }

    ngOnInit() {
        this.country = this.countries[1].value;
        this.onCountryChanged(null);
    }

    onCountryChanged(event) {
        if (!this.translations) {
            this.translations = [];
        }
        const item = this.translations.find(p => p.country === this.country);
        if (item) {
            this.translation = item;
        } else {
            this.translation = new Translation(this.country, '');
            this.translations.push(this.translation);
        }
    }
}
