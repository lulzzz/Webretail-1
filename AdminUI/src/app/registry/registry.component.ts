import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, Paginator } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { RegistryService } from './../services/registry.service';
import { Customer } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'app-registry-component',
    templateUrl: 'registry.component.html'
})

export class RegistryComponent implements OnInit {
    totalRecords = 0;
    customers: Customer[];
    selected: Customer;
    displayPanel: boolean;
    dataform: FormGroup;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private registryService: RegistryService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
       sessionService.title = 'Registries';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            // 'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
            'phone': new FormControl('', Validators.required),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
            'country': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
            'fiscalCode': new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
            'vatNumber': new FormControl('', [Validators.nullValidator, Validators.minLength(11), Validators.maxLength(11)])
        });

        this.registryService.getAll()
            .subscribe(result => {
                this.customers = result;
                this.totalRecords = this.customers.length;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.selected == null || this.selected.customerId === 0; }

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
            this.registryService
                .create(this.selected)
                .subscribe(result => {
                    this.customers.push(result);
                    this.totalRecords++;
                    this.closeClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.registryService
                .update(this.selected.customerId, this.selected)
                .subscribe(result => {
                    this.customers[this.selectedIndex] = this.selected;
                    this.closeClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this registry?',
            accept: () => {
                this.registryService
                    .delete(this.selected.customerId)
                    .subscribe(result => {
                        this.customers.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }
}
