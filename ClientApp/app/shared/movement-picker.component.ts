import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { DataTable, SelectItem, MenuItem } from 'primeng/primeng';
import { Movement } from './models';
import { Helpers } from './helpers';
import { MovementService } from './../services/movement.service';

@Component({
    selector: 'movement-picker',
    templateUrl: 'movement-picker.component.html',
    outputs: ['onPicked']
})

export class MovementPickerComponent {
    @ViewChild('dt') datatable: DataTable;
    totalRecords = 0;
    movements: Movement[];
	selected: Movement[];
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    onPicked = new EventEmitter();
    dateStartValue: Date;
    dateFinishValue: Date;
    public isOpen: boolean;

    constructor(private movementService: MovementService) {
        this.isOpen = false;
    }

    public loadData(customerId: number) {
        this.isOpen = true;
        if (!this.movements) {
            this.movementService
                .getByCustomerId(customerId)
                .subscribe(result => {
                    this.movements = result;
                    this.totalRecords = this.movements.length;
                    this.buildFilter(result);
                }, onerror => alert(onerror._body)
            );
        }
    }

    hidePickerClick() {
        this.isOpen = false;
    }

    pickerClick() {
        let data: number[] = [];
        this.selected.forEach(e => data.push(e.movementId));
        this.onPicked.emit(data);
        this.isOpen = false;
    }

    buildFilter(items: Movement[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.movementStore.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.movementCausal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
    }
}
