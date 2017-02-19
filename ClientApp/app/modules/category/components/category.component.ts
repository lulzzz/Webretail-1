import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
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
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private categoryService: CategoryService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'isPrimary': new FormControl('', Validators.required)
        });

        this.categoryService.getAll().subscribe(result => {
            this.categories = result;
            this.totalRecords = this.categories.length;
        }, onerror => alert('ERROR\r\n' + onerror));
    }

    get isNew() : boolean { return this.selected == null || this.selected.categoryId == 0; }

    get selectedIndex(): number { return this.categories.indexOf(this.selected); }

    addClick() {
        this.selected = new Category(0, '');
        this.displayDialog = true;
    }

    editClick(item: Category) {
        this.selected = item;
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.categoryService.create(this.selected).subscribe(result => {
                this.categories.push(result);
            });
        } else {
            this.categoryService.update(this.selected.categoryId, this.selected).subscribe(result => {
                //this.categories[this.selectedIndex] = this.selected;
            });
        }
        this.selected = null;
        this.displayDialog = false;
    }

    deleteClick() {
        this.categoryService.delete(this.selected.categoryId).subscribe(result => {
            this.categories.splice(this.selectedIndex, 1);
        });
        this.selected = null;
        this.displayDialog = false;
    }
}
