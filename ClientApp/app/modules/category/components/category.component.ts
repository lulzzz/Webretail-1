import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'category-component',
   	templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
    totalRecords = 0;
    categories: Category[];
	selected: Category;
    displayPanel: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private categoryService: CategoryService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'isPrimary': new FormControl('', Validators.required)
        });

        this.categoryService.getAll()
            .subscribe(result => {
                this.categories = result;
                this.totalRecords = this.categories.length;
            }//, onerror => alert('ERROR\r\n' + onerror)
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.categoryId == 0; }

    get selectedIndex(): number { return this.categories.indexOf(this.selected); }

    addClick() {
        this.selected = new Category(0, '');
        this.displayPanel = true;
    }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.categoryService.create(this.selected)
                .subscribe(result => {
                    this.categories.push(result);
                    this.selected = null;
                });
        } else {
            this.categoryService.update(this.selected.categoryId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayPanel = false;
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All associations with the products will be deleted. Are you sure that you want to delete this category?',
            accept: () => {
                this.categoryService.delete(this.selected.categoryId)
                    .subscribe(result => {
                        this.categories.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }
}
