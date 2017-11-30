import { Component, OnInit } from '@angular/core';
import { Product, Translation, Seo } from './../shared/models';
import { ProductService } from './../services/product.service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-seo',
    templateUrl: 'seo.component.html'
})

export class SeoComponent implements OnInit {
    country: string;
    countries: SelectItem[];
    title: Translation;
    description: Translation;

    constructor(private productService: ProductService) {
        this.countries = [];
        this.countries.push({label: 'English', value: 'EN'});
        this.countries.push({label: 'Italian', value: 'IT'});
    }

    get selected(): Product { return this.productService.product; }

    ngOnInit() {
        this.country = this.countries[1].value;
        this.onCountryChanged(null);
    }

    onCountryChanged(event) {
        if (!this.selected.seo.title) {
            this.selected.seo = new Seo();
        }

        const title = this.selected.seo.title.find(p => p.country === this.country);
        if (title) {
            this.title = title;
        } else {
            this.title = new Translation(this.country, '');
            this.selected.seo.title.push(this.title);
        }
        const description = this.selected.seo.description.find(p => p.country === this.country);
        if (description) {
            this.description = description;
        } else {
            this.description = new Translation(this.country, '');
            this.selected.seo.description.push(this.description);
        }
    }
}
