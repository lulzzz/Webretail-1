import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BrandService } from './../../../services/brand.service';
import { Brand } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'brand-component',
    templateUrl: 'brand.component.html'
})

export class BrandComponent implements OnInit {
    totalRecords = 0;
    brands: Brand[];
	selected: Brand;
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private brandService: BrandService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required)
        });

        this.brandService.getAll().subscribe(result => {
            this.brands = result;
            this.totalRecords = this.brands.length;
        }, onerror => alert('ERROR\r\n' + onerror));
    }

    get isNew() : boolean { return this.selected == null || this.selected.brandId == 0; }

    get selectedIndex(): number { return this.brands.indexOf(this.selected); }

    addClick() {
        this.selected = new Brand();
        this.displayDialog = true;
    }

    editClick(item: Brand) {
        this.selected = item;
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.brandService.create(this.selected)
                .subscribe(result => {
                    this.brands.push(result);
                });
        } else {
            this.brandService.update(this.selected.brandId, this.selected)
                .subscribe(result => {
                    //this.brands[this.selectedIndex] = this.selected;
                });
        }
        this.selected = null;
        this.displayDialog = false;
    }

    deleteClick() {
        this.brandService.delete(this.selected.brandId)
            .subscribe(result => {
                this.brands.splice(this.selectedIndex, 1);
            });
        this.selected = null;
        this.displayDialog = false;
    }
}
