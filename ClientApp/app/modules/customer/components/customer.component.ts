import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, Paginator } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit {
    @ViewChild('dt') public paginator: Paginator;
    totalRecords = 0;
    customers: Customer[];
	selected: Customer;
    displayPanel: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private customerService: CustomerService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl('', Validators.nullValidator),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', Validators.required),
            'country': new FormControl('', Validators.required),
            'fiscalCode': new FormControl('', Validators.nullValidator),
            'vatNumber': new FormControl('', Validators.nullValidator)
        });

        this.customerService.getAll()
            .subscribe(result => {
                this.customers = result;
                this.totalRecords = this.customers.length;
            }
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.customerId == 0; }

    get selectedIndex(): number { return this.customers.indexOf(this.selected); }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    addClick() {
        this.selected = new Customer();
        this.displayPanel = true;
    }

    saveClick() {
        if (this.isNew) {
            this.customerService
                .create(this.selected)
                .subscribe(result => {
                    this.customers.push(result);
                    this.selected = null;
                });
        } else {
            this.customerService
                .update(this.selected.customerId, this.selected)
                .subscribe(result => {
                    this.customers[this.selectedIndex] = this.selected;
                    this.selected = null;
                });
        }
        this.displayPanel = false;
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this customer?',
            accept: () => {
                this.customerService
                    .delete(this.selected.customerId)
                    .subscribe(result => {
                        this.customers.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }
}
