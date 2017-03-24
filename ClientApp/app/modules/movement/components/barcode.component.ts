import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './../../../services/authentication.service';
import { MovementService } from './../../../services/movement.service';
import { MovementArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'barcode-component',
    templateUrl: 'barcode.component.html'
})

export class BarcodeComponent implements OnInit, OnDestroy {
    private sub: any;
    movementId: number;
    items: MovementArticle[];

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private movementService: MovementService,
                private location: Location) {
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.movementId = params['id'];

            this.movementService.getItemsById(this.movementId)
                .subscribe(result => {
                    this.items = [];
                    result.forEach(element => {
                        for (let i = 0; i < element.quantity; i++) {
                            this.items.push(element);
                        }
                    });
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

    printClick() {
        window.print();
    }
}
