import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { MovementService } from './../../../services/movement.service';
import { Movement, MovementArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { ArticlePickerComponent } from './../../shared/components/article-picker.component';

@Component({
    selector: 'movement-component',
    templateUrl: 'movement.component.html'
})

export class MovementComponent implements OnInit, OnDestroy {
    @ViewChild(ArticlePickerComponent) inputComponent: ArticlePickerComponent;
    private sub: any;
    movementId: number;
    totalRecords = 0;
    totalItems = 0;
    barcodes: string[];
    movement: Movement;
    items: MovementArticle[];
    articleValue: string;
    committed: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private location: Location) {
        this.barcodes = [];
        this.committed = false;
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.movementId = params['id'];
            this.movementService.getById(this.movementId)
                .subscribe(result => {
                    this.movement = result;
                    this.committed = this.movement.committed;
                }, onerror => alert(onerror._body)
            );
            this.movementService.getItemsById(this.movementId)
                .subscribe(result => {
                    this.items = result;
                    this.updateTotals();
                }, onerror => alert(onerror._body)
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    cancelClick() {
        this.location.back();
    }

    updateTotals() {
        this.totalRecords = this.items.length;
        this.totalItems = this.items.map(p => p.quantity).reduce((sum, current) => sum + current);
    }

    addBarcode() {
        this.barcodes.forEach(barcode => {
            let item = this.items.find(p => p.barcode === barcode);
            if (item) {
                item.quantity += 1.0;
                this.movementService
                    .updateItem(item.movementArticleId, item)
                    .subscribe(result => {
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            } else {
                item = new MovementArticle();
                item.movementId = this.movementId;
                item.barcode = barcode;
                this.movementService
                    .createItem(item)
                    .subscribe(result => {
                        this.items.push(result);
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    showPickerClick() {
        this.inputComponent.loadData();
    }

    pickerClick(event: any) {
        this.barcodes.push(event);
        this.addBarcode();
    }

    updateClick(data: MovementArticle) {
        if (data.quantity > 0) {
            this.movementService.updateItem(data.movementArticleId, data)
                .subscribe(result => {
                    this.updateTotals();
                }, onerror => alert(onerror._body));
        } else {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this item?',
                accept: () => {
                    this.movementService.deleteItem(data.movementArticleId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(data), 1);
                            this.updateTotals();
                        }, onerror => alert(onerror._body));
                }
            });
        }
    }
}
