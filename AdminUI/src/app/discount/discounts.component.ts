import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { SessionService } from './../services/session.service';
import { DiscountService } from './../services/discount.service';
import { Discount } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'discounts-component',
    templateUrl: 'discounts.component.html'
})

export class DiscountsComponent implements OnInit {
    totalRecords = 0;
    items: Discount[];
    selected: Discount;
    displayPanel: boolean;
    dataform: FormGroup;
    dateStartValue: Date;
    dateFinishValue: Date;
    sliderValue: number;

    constructor(private router: Router,
                private sessionService: SessionService,
                private discountService: DiscountService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        sessionService.title = 'Discounts';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'percentage': new FormControl('', Validators.nullValidator),
            'price': new FormControl('', Validators.nullValidator),
            'start': new FormControl('', Validators.required),
            'finish': new FormControl('', Validators.required)
        });

        this.discountService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
             }
        );
    }

    get isNew(): boolean { return this.selected == null || this.selected.discountId === 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addClick() {
        this.selected = new Discount();
        this.displayPanel = true;
    }

    editClick() {
        if (!this.selected) {
            return;
        }
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.discountService.create(this.selected)
                .subscribe(result => {
                    this.selected = result;
                    this.totalRecords++;
                    this.openClick();
                }, onerror => alert(onerror._body));
        } else {
            this.discountService.update(this.selected.discountId, this.selected)
                .subscribe(result => {
                    this.items[this.selectedIndex] = result;
                    this.closeClick();
                }, onerror => {
                    alert(onerror._body);
                });
        }
    }

    deleteClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'All related items will be deleted. Are you sure that you want to delete this discount?',
            accept: () => {
                this.discountService.delete(this.selected.discountId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    openClick(detail = '') {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('discount/' + detail + this.selected.discountId);
    }
}
