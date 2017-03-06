import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
    templateUrl: 'movement.component.html'
})

export class MovementComponent implements OnInit, OnDestroy {
    private sub: any;
    movementId: number;
    totalRecords = 0;
    barcodes: string[];
    items: MovementArticle[];
	selected: MovementArticle;
    dataform: FormGroup;
    articleSearch: string;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.selected = new MovementArticle();
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.movementId = params['id'];
            this.movementService.getItemsById(this.movementId)
                .subscribe(result => {
                    this.items = result;
                    this.totalRecords = result.length;
                }//, onerror => alert('ERROR: ' + onerror)
            );
        });

        this.dataform = this.fb.group({
            'quantity': new FormControl('', Validators.required)
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addBarcode() {
        this.barcodes.forEach(barcode => {
            let item = this.items.find(p => p.barcode === barcode);
            if (item) {
                item.quantity += 1.0;
                alert(item.quantity);
                this.movementService
                    .updateItem(item.movementArticleId, item)
                    .subscribe(result => {
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                    });
            } else {
                item = new MovementArticle();
                item.movementId = this.movementId;
                item.barcode = barcode;
                this.movementService
                    .createItem(item)
                    .subscribe(result => {
                        this.items.push(result);
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                    });
            }
        });
    }

    saveClick() {
        this.movementService.updateItem(this.selected.movementArticleId, this.selected)
            .subscribe(result => {
                this.selected = null;
            });
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this item?',
            accept: () => {
                this.movementService.deleteItem(this.selected.movementArticleId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }
}
