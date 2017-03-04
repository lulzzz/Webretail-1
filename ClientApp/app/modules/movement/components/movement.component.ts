﻿import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { ProductService } from './../../../services/product.service';
import { MovementService } from './../../../services/movement.service';
import { MovementArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'movement-component',
    templateUrl: 'movement.component.html',
    //providers: [ ProductService ]
})

export class MovementComponent implements OnInit, OnDestroy {
    private sub: any;
    totalRecords = 0;
    items: MovementArticle[];
	selected: MovementArticle;
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                //rivate productService: ProductService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            this.movementService.getItemsById(id)
                .subscribe(result => {
                    this.items = result;
                }//, onerror => alert('ERROR: ' + onerror)
            );
        });

        this.dataform = this.fb.group({
            'article': new FormControl('', Validators.required),
            'quantity': new FormControl('', Validators.required)
        });

        /*
        this.ProductService.getAll()
            .subscribe(result => {
                this.products = result.map(p => Helpers.newSelectItem(p, p.productName));
            }
        );
        */
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    get isNew() : boolean { return this.selected == null || this.selected.movementId == 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addClick() {
        this.selected = new MovementArticle();
        this.displayDialog = true;
    }

    editClick() {
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.movementService.createItem(this.selected)
                .subscribe(result => {
                    this.items.push(result);
                    this.selected = null;
                });
        } else {
            this.movementService.updateItem(this.selected.movementId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayDialog = false;
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this item?',
            accept: () => {
                this.movementService.delete(this.selected.movementId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
                this.displayDialog = false;
            }
        });
    }
}