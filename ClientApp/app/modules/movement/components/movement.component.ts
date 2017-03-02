import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { MovementService } from './../../../services/movement.service';
import { Movement } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'movement-component',
    templateUrl: 'movement.component.html'
})

export class MovementComponent implements OnInit {
    totalRecords = 0;
    movements: Movement[];
	selected: Movement;
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'store': new FormControl('', Validators.required),
            'causal': new FormControl('', Validators.required),
            'desc': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.required)
        });

        this.movementService.getAll()
            .subscribe(result => {
                this.movements = result;
                this.totalRecords = this.movements.length;
            }
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.movementId == 0; }

    get selectedIndex(): number { return this.movements.indexOf(this.selected); }

    addClick() {
        this.selected = new Movement();
        this.displayDialog = true;
    }

    editClick(item: Movement) {
        this.selected = item;
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.movementService.create(this.selected)
                .subscribe(result => {
                    this.movements.push(result);
                    this.selected = null;
                });
        } else {
            this.movementService.update(this.selected.movementId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayDialog = false;
    }

    deleteClick(item: Movement) {
        this.selected = item;
        this.confirmationService.confirm({
            message: 'All related items will be deleted. Are you sure that you want to delete this movement?',
            accept: () => {
                this.movementService.delete(this.selected.movementId)
                    .subscribe(result => {
                        this.movements.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
                this.displayDialog = false;
            }
        });
    }
}
