import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem, SelectItem, Button, ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../services/session.service'
import { PublicationService } from '../services/publication.service'
import { Publication, Translation, Media } from '../shared/models'

@Component({
    selector: 'app-publication',
    templateUrl: 'publication.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PublicationComponent implements OnInit, OnDestroy {

    private sub: any;
    private items: MenuItem[];
    private selectedArray: any;
    selectedMedia: string;
    selectedKey: string;
    isBusy: boolean;
    activeIndex = 0;
    countries: SelectItem[];
    categories: SelectItem[];
    attributes: SelectItem[];
    translation: Translation;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private activatedRoute: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private publicationService: PublicationService,
                private location: Location) {

        sessionService.title = 'Publication';

        this.countries = [];
        this.countries.push({label: 'English', value: 'EN'});
        this.countries.push({label: 'Italian', value: 'IT'});
    }

    get product() { return this.publicationService.product; }

    get publication() { return this.publicationService.publication; }

    ngOnInit() {
        this.sessionService.checkCredentials(true);

        this.translation = new Translation(this.countries[0].value, '');
        this.selectedKey = 'Description';

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.publicationService.getProduct(id).subscribe(result => {
                this.publicationService.product = result;
                this.selectedArray = this.product.translations;
                this.categories = this.publicationService.getCategories();
                this.attributes = this.publicationService.getAttributes();
                this.publicationService.getPublication(id)
                    .subscribe(
                        res => {
                            res.productId = id;
                            this.publicationService.publication = res;
                            this.isBusy = false;
                        },
                        onerror => console.log(onerror._body)
                    );
            });
        });

        this.items = [{
                label: 'Translate Description',
                command: (event: any) => { this.activeIndex = 0; this.onIndexChanged(); }
            },
            {
                label: 'Translate Categories',
                command: (event: any) => { this.activeIndex = 1; this.onIndexChanged(); }
            },
            {
                label: 'Translate Attributes',
                command: (event: any) => { this.activeIndex = 2; this.onIndexChanged(); }
            },
            {
                label: 'Medias',
                command: (event: any) => { this.activeIndex = 3; this.onIndexChanged(); }
            },
            {
                label: 'Publish',
                command: (event: any) => { this.activeIndex = 4; this.onIndexChanged(); }
            }
        ];
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();

        this.selectedMedia = null;
        this.countries = null;
        this.publicationService.product = null;
        this.translation = null;
        this.categories = null;
        this.attributes = null;
    }

    cancelClick() {
        this.location.back();
    }

    onIndexChanged() {
        switch (this.activeIndex) {
            case 0:
                this.selectedKey = 'Description';
                this.selectedArray = this.product.translations;
                break;
            case 1:
                this.selectedKey = this.product.categories[0].category.categoryName;
                this.selectedArray = this.product.categories[0].category.translations;
                break;
            case 2:
                this.selectedKey = this.product.attributes[0].attribute.attributeName;
                this.selectedArray = this.product.attributes[0].attribute.translations;
                break;
            default:
                break;
        }
        this.translation = new Translation(this.translation.country, '');
    }

    // Step 1 2 3
    addTranslateClick() {
        if (this.translation.value === '') {
            this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Translate is not empty!'});
            return;
        }
        const translate = this.publicationService.getTranslate(this.selectedArray, this.translation.country);
        if (translate) {
            this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Translate for this country alrady present!'});
            return;
        }
        const item = new Translation(this.translation.country, this.translation.value);
        this.publicationService.addTranslate(this.selectedArray, item);
        this.translation.value = '';
    }

    selectTranslateClick(array, key) {
        this.selectedKey = key;
        this.selectedArray = array;
        this.translation = new Translation(this.translation.country, '');
    }

    updateTranslateClick(array, item) {
        if (item.value === '') {
            return;
        }

        this.publicationService.updateTranslate(array, item);
        this.messageService.add({severity: 'success', summary: 'Update translate', detail: 'Successfully updated!'});
    }

    deleteTranslateClick(array, item) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this translate?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.publicationService.deleteTranslate(array, item);
            }
        });
    }

    // Step 4
    onBeforeUpload(event) {
        // event.formData.append('codartCode', this.publicationService.codartinfo.id);
    }

    onUpload(event) {
        let index = this.product.medias.length;
        event.files.forEach(file => {
            index++;
            const media = new Media(file.name, 'media/' + file.name, index);
            this.publicationService.addMedia(media);
        });
    }

    updateMediaClick(item) {
        this.publicationService.updateMedia(item);
    }

    deleteMediaClick(item) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this media?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.publicationService.deleteMedia(item.id);
            }
        });
    }

    selectMedia(url: string) {
        this.selectedMedia = url;
    }

    saveClick() {
        this.isBusy = true;
        this.publicationService.saveProduct().subscribe(result => {
            this.publicationService.product = result;
            this.messageService.add({severity: 'success', summary: 'Product', detail: 'Successfully saved!'});
            if (this.publication.publicationStartAt) {
                if (this.publication.publicationId === 0) {
                    this.publication.productId = result.productId;
                    this.publicationService.create(this.publication)
                        .subscribe(response => {
                            this.publication.publicationId = response.publicationId;
                            this.isBusy = false;
                            this.messageService.add({severity: 'success', summary: 'Publication', detail: 'Successfully published!'});
                        });
                } else {
                    this.publication.productId = result.productId;
                    this.publicationService.update(this.publication.publicationId, this.publication)
                        .subscribe(response => this.isBusy = false );
                }
            }
        });
    }

    get status(): string {
        const status = this.publicationService.getStatus();
        return status === 'Completed' ? this.publicationService.published ? 'Published' : 'Ready for sale' : 'Check ' + status;
    }
}
