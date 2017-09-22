// import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Message, MenuItem, SelectItem, Button, ConfirmationService } from 'primeng/primeng';
// import { Observable } from 'rxjs/Rx';
// import { AuthenticationService } from '../services/authentication.service'
// import { PublicationService } from '../services/publication.service'
// import { Translate } from '../shared/models'

// @Component({
//     selector: 'publish',
//     template: require('./publish.component.html'),
//     styles: [require('./publish.component.css')],
//     encapsulation: ViewEncapsulation.None
// })
// export class PublicationComponent implements OnInit {

//     private sub: any;
//     private items: MenuItem[];
//     msgs: Message[] = [];
//     selectedMedia: string;
//     activeIndex = 0;
//     countries: SelectItem[];
//     attributes: SelectItem[];
//     translateCategory: Translate;
//     translateSubcategory: Translate;
//     translateDescription: Translate;
//     translateAttribute: Translate;

//     constructor(private authenticationService: AuthenticationService,
//                 private activatedRoute: ActivatedRoute,
//                 private confirmationService: ConfirmationService,
//                 private publicationService: PublicationService) { }

//     ngOnInit() {
//         this.authenticationService.checkCredentials(true);

//         this.countries = [];
//         this.countries.push({label: 'English', value: 'EN'});
//         this.countries.push({label: 'Italian', value: 'IT'});

//         // Subscribe to route params
//         this.sub = this.activatedRoute.params.subscribe(params => {
//             let id = params['id'];
//             this.publicationService.getCodart(id).subscribe(result => {
//                 this.publicationService.codartinfo = result;
//                 this.translateCategory = new Translate(this.countries[0].value, this.publicationService.codartinfo.category.id, '');
//                 this.translateSubcategory = new Translate(this.countries[0].value, this.publicationService.codartinfo.subcategory.id, '');
//                 this.translateDescription = new Translate(this.countries[0].value, this.publicationService.codartinfo.id, '');
//                 this.translateAttribute = new Translate(this.countries[0].value, '', '');
//                 this.attributes = this.publicationService.getAttributes();
//             });
//         });

//         this.items = [{
//                 label: 'Translate Categories',
//                 command: (event: any) => this.activeIndex = 0
//             },
//             {
//                 label: 'Translate Description',
//                 command: (event: any) => this.activeIndex = 1
//             },
//             {
//                 label: 'Translate Attributes',
//                 command: (event: any) => this.activeIndex = 2
//             },
//             {
//                 label: 'Images',
//                 command: (event: any) => this.activeIndex = 3
//             },
//             {
//                 label: 'Publish',
//                 command: (event: any) => this.activeIndex = 4
//             }
//         ];
//     }

//     ngOnDestroy() {
//         // Clean sub to avoid memory leak
//         this.sub.unsubscribe();

//         this.msgs = null;
//         this.selectedMedia = null;
//         this.countries = null;
//         this.publicationService.codartinfo = null;
//         this.translateCategory = null;
//         this.translateSubcategory = null;
//         this.translateDescription = null;
//         this.translateAttribute = null;
//         this.attributes = null;
//     }

//     get codartinfo() { return this.publicationService.codartinfo; }

//     // Step 1 2 3
//     addTranslateClick(item, type) {
//         if (item.value === '') {
//             this.msgs.push({severity: 'warn', summary: 'Attention', detail: 'Translate is not empty!'});
//             return;
//         }
//         let translate = this.publicationService.getTranslate(type, item.code, item.key);
//         if (translate) {
//             this.msgs.push({severity: 'warn', summary: 'Attention', detail: 'Translate for this country alrady present!'});
//             return;
//         }

//         this.publicationService.addTranslate(item).subscribe(result => {
//             this.publicationService.addTranslateModel(type, result);
//              item.value = '';
//         },
//         error => this.msgs.push({severity: 'error', summary: 'Add translate', detail: error}));
//     }

//     updateTranslateClick(item) {
//         if (item.value === '') {
//             return;
//         }

//         this.publicationService.updateTranslate(item).subscribe(result => {
//             this.msgs.push({severity: 'success', summary: 'Update translate', detail: 'Successfully updated!'});
//         },
//         error => this.msgs.push({severity: 'error', summary: 'Update translate', detail: error}));
//     }

//     deleteTranslateClick(item, type) {
//         this.confirmationService.confirm({
//             message: 'Do you want to delete this translate?',
//             header: 'Delete Confirmation',
//             icon: 'fa fa-trash',
//             accept: () => {
//                 this.publicationService.deleteTranslate(item.id)
//                     .subscribe(result => this.publicationService.deleteTranslateModel(type, item),
//                     error => this.msgs.push({severity: 'error', summary: 'Delete translate', detail: error}));
//             }
//         });
//     }

//     // Step 4
//     onBeforeUpload(event) {
//         event.formData.append('codartCode', this.publicationService.codartinfo.id);
//     }

//     onUpload(event) {
//         this.publicationService.getMedias().subscribe(result => {
//             this.publicationService.codartinfo.medias = result;
//         });
//     }

//     updateMediaClick(item) {
//         this.publicationService.updateMedia(item).subscribe(result => {
//             this.msgs.push({severity: 'success', summary: 'Update media', detail: 'Successfully updated!'});
//         },
//         error => this.msgs.push({severity: 'error', summary: 'Update media', detail: error}));
//     }

//     deleteMediaClick(item) {
//         this.confirmationService.confirm({
//             message: 'Do you want to delete this media?',
//             header: 'Delete Confirmation',
//             icon: 'fa fa-trash',
//             accept: () => {
//                 this.publicationService.deleteMedia(item.id).subscribe(result => {
//                     this.publicationService.deleteMediaModel(item);
//                 },
//                 error => this.msgs.push({severity: 'error', summary: 'Delete translate', detail: error}));
//             }
//         });
//     }

//     selectMedia(url: string) {
//         this.selectedMedia = url;
//     }

//     // Step 5
//     handleFeaturedChange(e) {
//         let isChecked = e.checked ? 'on' : 'off';
//         this.publicationService.updateFeature(isChecked)
//             .subscribe(result => this.msgs.push({severity: 'success', summary: 'Update featured', detail: 'Status: ' + isChecked}),
//             error => this.msgs.push({severity: 'error', summary: 'Update featured', detail: error}));
//     }

//     handlePublishedChange(e) {
//         let isChecked = 'off';
//         if (e.checked) {
//             isChecked = 'on'
//             if (this.status.startsWith('Check')) {
//                 this.codartinfo.published = null;
//                 return;
//             }
//         }

//         this.publicationService.updatePublish(isChecked)
//             .subscribe(result => this.msgs.push({severity: 'success', summary: 'Publish on the store', detail: 'Status: ' + isChecked}),
//             error => this.msgs.push({severity: 'error', summary: 'Publish on the store', detail: error}));
//     }

//     get status(): string {
//         let status = this.publicationService.getStatus();
//         return status === 'Completed' ? this.publicationService.published ? 'Published' : 'Ready for sale' : 'Check ' + status;
//     }
// }
