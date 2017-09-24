import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Message, MenuItem, SelectItem, Button, ConfirmationService } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/authentication.service'
import { PublicationService } from '../services/publication.service'
import { Publication, Translation } from '../shared/models'

@Component({
    selector: 'publication',
    templateUrl: 'publication.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PublicationComponent implements OnInit {

    private sub: any;
    private items: MenuItem[];
    msgs: Message[] = [];
    selectedMedia: string;
    activeIndex = 0;
    countries: SelectItem[];
    categories: SelectItem[];
    attributes: SelectItem[];
    translation: Translation;

    constructor(private authenticationService: AuthenticationService,
                private activatedRoute: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private publicationService: PublicationService,
                private location: Location) {

        authenticationService.title = 'Publication';

        this.countries = [];
        this.countries.push({label: 'English', value: 'EN'});
        this.countries.push({label: 'Italian', value: 'IT'});

        this.translation = new Translation(this.countries[0].value, '', '');
    }

    get product() { return this.publicationService.product; }

    get publication() { return this.publicationService.publication; }

    ngOnInit() {
        this.authenticationService.checkCredentials(true);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            this.publicationService.getProduct(id).subscribe(result => {
                this.publicationService.product = result;
                this.publicationService.publication = new Publication(result.productId);
                this.categories = this.publicationService.getCategories();
                this.attributes = this.publicationService.getAttributes();
            });
        });

        this.items = [{
                label: 'Translate Description',
                command: (event: any) => this.activeIndex = 0
            },
            {
                label: 'Translate Categories',
                command: (event: any) => this.activeIndex = 1
            },
            {
                label: 'Translate Attributes',
                command: (event: any) => this.activeIndex = 2
            },
            {
                label: 'Medias',
                command: (event: any) => this.activeIndex = 3
            },
            {
                label: 'Publish',
                command: (event: any) => this.activeIndex = 4
            }
        ];
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();

        this.msgs = null;
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

    // Step 1 2 3
    addTranslateClick(array, item) {
        if (item.value === '') {
            this.msgs.push({severity: 'warn', summary: 'Attention', detail: 'Translate is not empty!'});
            return;
        }
        let translate = this.publicationService.getTranslate(array, item.country, item.key);
        if (translate) {
            this.msgs.push({severity: 'warn', summary: 'Attention', detail: 'Translate for this country alrady present!'});
            return;
        }

        this.publicationService.addTranslate(array, item);
        item.value = '';
    }

    updateTranslateClick(array, item) {
        if (item.value === '') {
            return;
        }

        this.publicationService.updateTranslate(array, item);
        this.msgs.push({severity: 'success', summary: 'Update translate', detail: 'Successfully updated!'});
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
        // this.publicationService.getMedias().subscribe(result => {
        //     this.publicationService.codartinfo.medias = result;
        // });
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

    // Step 5
    handleFeaturedChange(e) {
        this.publicationService.publication.publicationFeatured = e.checked;
    }

    saveClick() {
        this.publicationService.saveProduct().subscribe(result => {
            this.publicationService.product = result;
            this.msgs.push({severity: 'success', summary: 'Save', detail: 'Successfully saved!'});
            if (this.publication.publicationStartAt) {
                if (this.publication.publicationId === 0) {
                    this.publicationService.create(this.publication)
                        .subscribe(response =>
                            this.msgs.push({severity: 'success', summary: 'Publication', detail: 'Successfully published!'})
                        );
                } else {
                    this.publicationService.update(this.publication.publicationId, this.publication)
                        .subscribe(response => { });
                }
            }
        });
    }

    get status(): string {
        let status = this.publicationService.getStatus();
        return status === 'Completed' ? this.publicationService.published ? 'Published' : 'Ready for sale' : 'Check ' + status;
    }
}
