import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { CausalService } from './../../../services/causal.service';
import { MovementService } from './../../../services/movement.service';
import { Movement } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'movements-component',
    templateUrl: 'movements.component.html',
    providers: [ StoreService, CausalService ]
})

export class MovementsComponent implements OnInit {
    totalRecords = 0;
    committed: boolean;
	movements: Movement[];
	selected: Movement;
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    displayPanel: boolean;
	dataform: FormGroup;
    buttons: MenuItem[];

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private storeService: StoreService,
                private causalService: CausalService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'store': new FormControl('', Validators.required),
            'causal': new FormControl('', Validators.required),
            'desc': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.nullValidator)
        });

        this.uncommittedClick();

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p, p.storeName));
            }
        );

        this.causalService.getAll()
            .subscribe(result => {
                this.causals = result.map(p => Helpers.newSelectItem(p, p.causalName));
            }
        );
    }

    loadData() {
         this.movementService.getAll(this.committed)
            .subscribe(result => {
                this.movements = result;
                this.totalRecords = this.movements.length;
                this.buildFilter(result);
            }
        );
    }

    buildFilter(items: Movement[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.store.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.causal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
    }

    get isNew() : boolean { return this.selected == null || this.selected.movementId == 0; }

    get selectedIndex(): number { return this.movements.indexOf(this.selected); }

    addClick() {
        this.selected = new Movement();
        if (this.stores.length > 0) {
            this.selected.store = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.causal = this.causals[0].value;
        }
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
            this.movementService.create(this.selected)
                .subscribe(result => {
                    this.movements.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.movementService.update(this.selected.movementId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'All related items will be deleted. Are you sure that you want to delete this movement?',
            accept: () => {
                this.movementService.delete(this.selected.movementId)
                    .subscribe(result => {
                        this.movements.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    commitClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Commit',
            message: 'All related items will be send to warehouse. Are you sure that you want to "commit" this movement?',
            accept: () => {
                this.movementService.commit(this.selected.movementId)
                    .subscribe(result => {
                        this.movements.splice(this.selectedIndex, 1);
                        this.selected = null;
                    }, onerror => alert(onerror._body));
            }
        });
    }

    roolbackClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Roolback',
            message: 'All related items will be taken to warehouse. Are you sure that you want to "uncommit" this movement?',
            accept: () => {
                this.movementService.roolback(this.selected.movementId)
                    .subscribe(result => {
                        this.movements.splice(this.selectedIndex, 1);
                        this.selected = null;
                    }, onerror => alert(onerror._body));
            }
        });
    }

    committedClick() {
        this.committed = true;
        this.buttons = [
            { label: 'Roolbak', icon: 'fa-reply', command: () => this.roolbackClick() },
            { label: 'Uncommitted', icon: 'fa-tasks', command: () => this.uncommittedClick() }
        ];

        this.loadData();
    }

    uncommittedClick() {
        this.committed = false;
        this.buttons = [
            { label: 'Commit', icon: 'fa-share', command: () => this.commitClick() },
            { label: 'Committed', icon: 'fa-tasks', command: () => this.committedClick() }
        ];
        this.loadData();
    }

    openClick() {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('movement/' + this.selected.movementId);
    }
}
