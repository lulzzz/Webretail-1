import { Component, OnInit, Input } from '@angular/core';
import { Translation, Seo } from './../shared/models';
import { SelectItem } from 'primeng/primeng';
import { Helpers } from './helpers';

@Component({
    selector: 'app-seo',
    templateUrl: 'seo.component.html'
})

export class SeoComponent implements OnInit {
    @Input() path: string;
    @Input() seo: Seo;
    country: string;
    countries: SelectItem[];
    title: Translation;
    description: Translation;

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
        if (!this.seo.title) {
            this.seo = new Seo();
        }

        const title = this.seo.title.find(p => p.country === this.country);
        if (title) {
            this.title = title;
        } else {
            this.title = new Translation(this.country, '');
            this.seo.title.push(this.title);
        }
        const description = this.seo.description.find(p => p.country === this.country);
        if (description) {
            this.description = description;
        } else {
            this.description = new Translation(this.country, '');
            this.seo.description.push(this.description);
        }
    }
}
