import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SessionService } from './../services/session.service';
import { BrandService } from './../services/brand.service';
import { Brand } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'brand-component',
    templateUrl: 'brand.component.html'
})

export class BrandComponent implements OnInit {
    totalRecords = 0;
    brands: Brand[];
    selected: Brand;
    displayPanel: boolean;
    dataform: FormGroup;

    constructor(private sessionService: SessionService,
                private brandService: BrandService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
       sessionService.title = 'Brands';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required)
        });

        this.brandService
            .getAll()
            .subscribe(result => {
                this.brands = result;
                this.totalRecords = this.brands.length;
            }, onerror => alert(onerror._body)
        );
    }

    get isNew(): boolean { return this.selected == null || this.selected.brandId === 0; }

    get selectedIndex(): number { return this.brands.indexOf(this.selected); }

    addClick() {
        this.selected = new Brand();
        this.displayPanel = true;
    }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.brandService
                .create(this.selected)
                .subscribe(result => {
                    this.brands.push(result);
                    this.totalRecords++;
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.brandService
                .update(this.selected.brandId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All related products will be deleted. Are you sure that you want to delete this brand?',
            accept: () => {
                this.brandService
                    .delete(this.selected.brandId)
                    .subscribe(result => {
                        this.brands.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}
