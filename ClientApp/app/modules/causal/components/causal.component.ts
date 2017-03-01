﻿import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { CausalService } from './../../../services/causal.service';
import { Causal } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'causal-component',
    templateUrl: 'causal.component.html'
})

export class CausalComponent implements OnInit {
    totalRecords = 0;
    causals: Causal[];
    operators: SelectItem[];
	selected: Causal;
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private causalService: CausalService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.operators = [];
        this.operators.push({label: 'Increse', value: '+'});
        this.operators.push({label: 'Nothing', value: ' '});
        this.operators.push({label: 'Decrese', value: '-'});

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'quantity': new FormControl('', Validators.required),
            'booked': new FormControl('', Validators.required)
        });

        this.causalService.getAll()
            .subscribe(result => {
                this.causals = result;
                this.totalRecords = this.causals.length;
            }
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.causalId == 0; }

    get selectedIndex(): number { return this.causals.indexOf(this.selected); }

    addClick() {
        this.selected = new Causal();
        this.displayDialog = true;
    }

    editClick(item: Causal) {
        this.selected = item;
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.causalService.create(this.selected)
                .subscribe(result => {
                    this.causals.push(result);
                    this.selected = null;
                });
        } else {
            this.causalService.update(this.selected.causalId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayDialog = false;
    }

    deleteClick(item: Causal) {
        this.selected = item;
        this.confirmationService.confirm({
            message: 'All related movements will be deleted. Are you sure that you want to delete this causal?',
            accept: () => {
                this.causalService.delete(this.selected.causalId)
                    .subscribe(result => {
                        this.causals.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
                this.displayDialog = false;
            }
        });
    }
}