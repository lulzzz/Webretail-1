import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from './../services/session.service';
import { Discount } from './../shared/models';

@Component({
    selector: 'app-discount',
    templateUrl: 'discount.component.html'
})

export class DiscountComponent implements OnInit {
    @Input() discount: Discount;
    dataform: FormGroup;
    dateStartValue: Date;
    dateFinishValue: Date;

    constructor(private sessionService: SessionService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'percentage': new FormControl('', Validators.nullValidator),
            'price': new FormControl('', Validators.nullValidator),
            'start': new FormControl('', Validators.required),
            'finish': new FormControl('', Validators.required)
        });
    }

    // saveClick() {
    //     if (this.isNew) {
    //         this.discountService.create(this.selected)
    //             .subscribe(result => {
    //                 this.selected = result;
    //                 this.totalRecords++;
    //             }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    //     } else {
    //         this.discountService.update(this.selected.discountId, this.selected)
    //             .subscribe(result => {
    //                 this.items[this.selectedIndex] = result;
    //                 this.closeClick();
    //             }, onerror => {
    //                 this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body});
    //             });
    //     }
    // }
}
