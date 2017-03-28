import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { CausalService } from './../services/causal.service';
import { Causal } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'causal-component',
    templateUrl: 'causal.component.html'
})

export class CausalComponent implements OnInit {
    totalRecords = 0;
    causals: Causal[];
    operators: SelectItem[];
	selected: Causal;
    displayPanel: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private causalService: CausalService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.operators = [];
        this.operators.push({label: '-1', value: -1});
        this.operators.push({label: '0', value: 0});
        this.operators.push({label: '+1', value: +1});

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'quantity': new FormControl('', Validators.required),
            'booked': new FormControl('', Validators.required)
        });

        this.causalService
            .getAll()
            .subscribe(result => {
                this.causals = result;
                this.totalRecords = this.causals.length;
            }, onerror => alert(onerror._body));
    }

    get isNew() : boolean { return this.selected == null || this.selected.causalId == 0; }

    get selectedIndex(): number { return this.causals.indexOf(this.selected); }

    addClick() {
        this.selected = new Causal();
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
            this.causalService
                .create(this.selected)
                .subscribe(result => {
                    this.causals.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.causalService
                .update(this.selected.causalId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All related movements will be deleted. Are you sure that you want to delete this causal?',
            accept: () => {
                this.causalService
                    .delete(this.selected.causalId)
                    .subscribe(result => {
                        this.causals.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}
