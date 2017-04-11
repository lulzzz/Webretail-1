import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { MovementService } from './../services/movement.service';
import { Movement } from './../shared/models';
import { DateFilterPipe } from './../pipes/date-filter.pipe';

@Component({
    selector: 'reportcashregister-component',
    templateUrl: 'cashregister.component.html'
})

export class ReportCashRegisterComponent implements OnInit {
    totalItems = 0;
    totalAmount = 0.0;
    movemets: Movement[];
    items: Movement[];
    private _dateStartValue: Date;
    private _dateFinishValue: Date;

    constructor(private authenticationService: AuthenticationService,
                private movementService: MovementService) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.movementService
            .getReceipted()
            .subscribe(result => {
                this.movemets = result;
                this.dateStartValue = new Date();
            }, onerror => alert(onerror._body)
        );
    }

    @Input() set dateStartValue(value: Date) {
        this._dateStartValue = value;
        this.updateTotals();
    }
    get dateStartValue(): Date {
        return this._dateStartValue;
    }

    @Input() set dateFinishValue(value: Date) {
        this._dateFinishValue = value;
        this.updateTotals();
    }
    get dateFinishValue(): Date {
        return this._dateFinishValue;
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

    updateTotals() {
        this.items = new DateFilterPipe().transform(this.movemets, this.dateStartValue, this.dateFinishValue);
        this.totalItems = this.items.length;
        if (this.totalItems > 0) {
            this.totalAmount = this.items.map(p => p.movementAmount).reduce((sum, current) => sum + current);
        }
    }
}
