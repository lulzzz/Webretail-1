import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { MovementService } from './../services/movement.service';
import { MovementArticle, Period } from './../shared/models';
import { DateFilterPipe } from './../pipes/date-filter.pipe';

@Component({
    selector: 'reportsales-component',
    templateUrl: 'sales.component.html'
})

export class ReportSalesComponent implements OnInit {
    private period: Period;
    totalItems = 0;
    totalAmount = 0.0;
    items: MovementArticle[];
    articleValue: string;
    categoryValue: string;
    priceValue: number;
    amountValue: number;

    constructor(private authenticationService: AuthenticationService,
                private movementService: MovementService) {
        authenticationService.title = 'Sales';
    }

    ngOnInit() {
        this.authenticationService.checkCredentials(true);

        this.period = new Period();
        this.getData();
    }

    @Input() set dateStartValue(value: Date) {
        this.period.start = value;
    }
    get dateStartValue(): Date {
        return this.period.start;
    }

    @Input() set dateFinishValue(value: Date) {
        this.period.finish = value;
     }
    get dateFinishValue(): Date {
        return this.period.finish;
    }

    calculateGroupTotal(brand: string) {
        let total = 0;
        if (this.items) {
            for (let movemet of this.items) {
                if (movemet.movementArticleProduct.brand.brandName === brand) {
                    total += movemet.movementArticleAmount;
                }
            }
        }
        return total;
    }

    getData() {
        this.movementService
            .getSales(this.period)
            .subscribe(result => {
                this.items = result;
                this.totalItems = result.length;
                if (this.totalItems > 0) {
                    this.totalAmount = this.items.map(p => p.movementArticleAmount).reduce((sum, current) => sum + current);
                }
            }, onerror => alert(onerror._body)
        );
    }
}
