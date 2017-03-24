﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './../../../services/authentication.service';
import { MovementService } from './../../../services/movement.service';
import { Movement, MovementArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'document-component',
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit, OnDestroy {
    private sub: any;
    movementId: number;
    totalItems = 0;
    totalAmount = 0.0;
    item: Movement;
    groups: any[];

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

            this.movementService.getById(this.movementId)
                .subscribe(result => {
                    this.item = result;
                }, onerror => alert(onerror._body)
            );

            this.movementService.getItemsById(this.movementId)
                .subscribe(result => {
                    let items: MovementArticle[] = [];
                    for (let i = 0; i < 100; i++) {
                        items.push(result[0]);
                    }

                    this.groups = [];
                    let array: MovementArticle[] = [];
                    let index = 0;
                    items.forEach((item) => {
                        array.push(item);
                        if (index > 11) {
                            this.groups.push(array);
                            array = [];
                            index = -1;
                        }
                        index++;
                    });
                    this.groups.push(array);

                    this.totalItems = result.map(p => p.quantity).reduce((sum, current) => sum + current);
                    this.totalAmount = result.map(p => p.amount).reduce((sum, current) => sum + current);
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
