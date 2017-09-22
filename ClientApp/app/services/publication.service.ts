// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import { SelectItem } from 'primeng/primeng';
// import { CodartInfo, Codart, Media, Translate, TranslateModel } from '../shared/models'
// import { Helpers } from '../shared/helpers'

// @Injectable()
// export class PublicationService {

//     public codartinfo: CodartInfo;

//     constructor(private http: Http) {
//     }

//     get translateDescriptions() { return this.codartinfo.translates.filter(item => item.key === this.codartinfo.id); }
//     get translateAttributes() { return this.codartinfo.translates.filter(item => item.key !== this.codartinfo.id); }
//     get published() { return this.codartinfo.published != null; }

//     get step1() {
//         return this.codartinfo.category.translates.length === 2 && this.codartinfo.subcategory.translates.length === 2 ? 'Completed' : 'In progress';
//     }
//     get step2() { return this.translateDescriptions.length === 2 ? 'Completed' : 'In progress'; }
//     get step4() { return this.codartinfo.medias.length > 0 ? 'Completed' : 'In progress'; }

//     getStatus(): string {
//         if (this.step1 !== 'Completed') {
//             return 'step 1';
//         } else if (this.step2 !== 'Completed') {
//             return 'step 2';
//         } else if (this.step4 !== 'Completed') {
//             return 'step 4';
//         }
//         return 'Completed';
//     }

//     getProducts(): Observable<TranslateModel[]> {
//         return this.http.get('api/codart/products').map(result => <TranslateModel[]>result.json());
//     }

//     getCodarts(): Observable<CodartInfo[]> {
//         return this.http.get('/api/codart/store').map(result => <CodartInfo[]>result.json());
//     }

//     getCodart(id): Observable<CodartInfo> {
//         return this.http.get('/api/codart/' + id).map(result => <CodartInfo>result.json());
//     }

//     getAttributes(): SelectItem[] {
//         let sizes =  Helpers.distinct(this.codartinfo.codarts.map((item: Codart) => Helpers.newSelectItem(item.size)));
//         let colors = Helpers.distinct(this.codartinfo.codarts.map((item: Codart) => Helpers.newSelectItem(item.color)));
//         return colors.concat(sizes);
//     }

//     getTranslate(type, code, key): Translate {
//         let translate: Translate;
//         switch (type) {
//             case 'category':
//                 translate = this.codartinfo.category.translates.find(p => p.code === code);
//                 break;
//             case 'subcategory':
//                 translate = this.codartinfo.subcategory.translates.find(p => p.code === code)
//                 break;
//             default:
//                 translate = this.codartinfo.translates.find(p => p.code === code && p.key === key)
//                 break;
//         }
//         return translate;
//     }

//     addTranslate(item): Observable<Translate> {
//         return this.http.post('/api/translate', item, { headers: Helpers.getHeaders() })
//           .map(response => <Translate>response.json());
//     }

//     addTranslateModel(type, item) {
//         switch (type) {
//             case 'category':
//                 this.codartinfo.category.translates.push(item);
//                 break;
//             case 'subcategory':
//                 this.codartinfo.subcategory.translates.push(item);
//                 break;
//             default:
//                 this.codartinfo.translates.push(item);
//                 break;
//         }
//     }

//     updateTranslate(item): Observable<any> {
//         return this.http.put('/api/translate/' + item.id, item, { headers: Helpers.getHeaders() })
//           .map(response => response.json());
//     }

//     deleteTranslate(id): Observable<any> {
//         return this.http.delete('/api/translate/' + id, { headers: Helpers.getHeaders()})
//           .map(response => response.json());
//     }

//     deleteTranslateModel(type, item) {
//         switch (type) {
//             case 'category':
//                 let index1 = this.codartinfo.category.translates.indexOf(item);
//                 this.codartinfo.category.translates.splice(index1, 1);
//                 break;
//             case 'subcategory':
//                 let index2 = this.codartinfo.subcategory.translates.indexOf(item);
//                 this.codartinfo.subcategory.translates.splice(index2, 1);
//                 break;
//             default:
//                 let index3 = this.codartinfo.translates.indexOf(item);
//                 this.codartinfo.translates.splice(index3, 1);
//                 break;
//         }
//     }

//     getMedias(): Observable<Media[]> {
//         return this.http.get('/api/media/codart/' + this.codartinfo.id).map(result => <Media[]>result.json());
//     }

//     updateMedia(item): Observable<any> {
//         return this.http.put('/api/media/' + item.id, item, { headers: Helpers.getHeaders() })
//           .map(response => response.json());
//     }

//     deleteMediaModel(item) {
//         let index = this.codartinfo.medias.indexOf(item);
//         this.codartinfo.medias.splice(index, 1);
//     }

//     deleteMedia(id): Observable<any> {
//         return this.http.delete('/api/media/' + id, { headers: Helpers.getHeaders() })
//           .map(response => response.json());
//     }

//     updateFeature(value): Observable<any> {
//         let url = '/api/codart/' + this.codartinfo.id + '/featured/' + value;
//         return this.http.get(url, { headers: Helpers.getHeaders() })
//             .map(result => result);
//     }

//     updatePublish(value): Observable<any> {
//         let url = '/api/codart/' + this.codartinfo.id + '/store/' + value;
//         return this.http.get(url, { headers: Helpers.getHeaders() })
//             .map(result => result);
//     }
// }
