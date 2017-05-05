import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { DeviceService } from './../services/device.service';
import { StoreService } from './../services/store.service';
import { Device } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'device-component',
    templateUrl: 'device.component.html'
})

export class DeviceComponent implements OnInit {
    totalRecords = 0;
    items: Device[];
	selected: Device;
    stores: SelectItem[];
    displayPanel: boolean;
	dataform: FormGroup;
    
    constructor(private authenticationService: AuthenticationService,
                private deviceService: DeviceService,
                private storeService: StoreService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'token': new FormControl('', Validators.nullValidator),
            'store': new FormControl('', Validators.required),
            'join': new FormControl('', Validators.required)
        });

        this.deviceService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
            }, onerror => alert(onerror._body)
        );

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p, p.storeName));
            }, onerror => alert(onerror._body)
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.deviceId == 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addClick() {
        this.selected = new Device();
        this.selected.store = this.stores.length > 0 ? this.stores[0].value : null;
        this.dataform.controls.join.setValue(false);
        this.displayPanel = true;
    }

    onRowSelect(event: any) {
        this.dataform.controls.join.setValue(false);
        var json = localStorage.getItem("cashRegister");
        if (json != null) {
            var device: Device = JSON.parse(json)
            if (device.deviceId == this.selected.deviceId) {
                this.dataform.controls.join.setValue(true);
            }
        }
        this.displayPanel = true;
    }

    closeClick() {
        if (this.dataform.controls.join.value === true) {
            localStorage.setItem("cashRegister", JSON.stringify(this.selected));
        }
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.deviceService
                .create(this.selected)
                .subscribe(result => {
                    this.selected = result;
                    this.items.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.deviceService
                .update(this.selected.deviceId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this device?',
            accept: () => {
                this.deviceService
                    .delete(this.selected.deviceId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}
