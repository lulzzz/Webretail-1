import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { MovementService } from './../services/movement.service';
import { Movement } from './../shared/models';

@Component({
    selector: 'cashregister-component',
    templateUrl: 'cashregister.component.html'
})

export class CashRegisterComponent implements OnInit {
    totalItems = 0;
    items: Movement[];

    constructor(private authenticationService: AuthenticationService,
                private movementService: MovementService) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.movementService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalItems = this.items.length;
            }, onerror => alert(onerror._body)
        );
    }

    calculateGroupTotal(device: string) {
        let total = 0;
        if(this.items) {
            for(let movemet of this.items) {
                if(movemet.movementDevice === device) {
                    total += movemet.movementAmount;
                }
            }
        }
        return total;
    }
}
