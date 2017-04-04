import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { MovementService } from './../services/movement.service';
import { Movement, MovementArticle } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { ArticlePickerComponent } from './../shared/article-picker.component';

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
    totalAmount = 0.0;
    barcodes: string[];
    item: Movement;
    items: MovementArticle[];
    articleValue: string;
    priceValue: number;
    amountValue: number;
    committed: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private location: Location) {
        this.barcodes = [];
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.movementId = params['id'];
            this.movementService.getById(this.movementId)
                .subscribe(result => {
                    this.item = result;
                    this.committed = result.movementStatus != 'New';
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
        if (!this.items || this.items.length === 0) {
            return;
        }
        this.totalRecords = this.items.length;
        this.totalItems = this.items.map(p => p.movementArticleQuantity).reduce((sum, current) => sum + current);
        this.totalAmount = this.items.map(p => p.movementArticleAmount).reduce((sum, current) => sum + current);
    }

    addBarcode() {
        this.barcodes.forEach(data => {
            let array = data.split('#');
            let barcode = array[0];
            let quantity = array.length === 2 ? Number(array[1]) : 1.0;
            let newItem = this.items.find(p => p.movementArticleBarcode === barcode);
            if (newItem) {
                newItem.movementArticleQuantity += quantity;
                this.movementService
                    .updateItem(newItem.movementArticleId, newItem)
                    .subscribe(result => {
                        this.barcodes.splice(this.barcodes.indexOf(data), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            } else {
                newItem = new MovementArticle();
                newItem.movementId = this.movementId;
                newItem.movementArticleBarcode = barcode;
                newItem.movementArticleQuantity = quantity;
                let price = this.item.movementCausal.causalQuantity > 0 ? 'purchase' : this.item.movementCausal.causalQuantity < 0 ? 'selling' : 'none';               
                this.movementService
                    .createItem(newItem, price)
                    .subscribe(result => {
                        this.items.push(result);
                        this.barcodes.splice(this.barcodes.indexOf(data), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    showPickerClick() {
        this.inputComponent.loadData();
    }

    pickerClick(event: any) {
        this.barcodes = this.barcodes.concat(event);
        this.addBarcode();
    }

    onUpdate(data: MovementArticle) {
        if (data.movementArticleQuantity === 0) {
            data.movementArticleAmount = 0;
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this item?',
                accept: () => {
                    this.movementService
                        .deleteItem(data.movementArticleId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(data), 1);
                            this.updateTotals();
                        }, onerror => alert(onerror._body));
                }
            });
        } else {
            this.movementService
                .updateItem(data.movementArticleId, data)
                .subscribe(result => {
                    data.movementArticleAmount = result.movementArticleAmount;
                    this.updateTotals();
                }, onerror => alert(onerror._body));
        }
    }
}
