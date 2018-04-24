import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Company, PdfDocument, Media, Basket } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Injectable()
export class CompanyService {

    constructor(private http: Http) {
    }

    get(): Observable<Company> {
        return this.http.get('/api/company', { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }

    create(model: Company): Observable<Company> {
        return this.http.post('/api/company', model, { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }

    update(model: Company): Observable<Company> {
        return this.http.put('/api/company', model, { headers: Helpers.getHeaders() })
            .map(result => <Company>result.json());
    }

    upload(formData: FormData): Observable<Media[]> {
      return this.http.post('/api/media', formData)
      .map(result => <Media[]>result.json());
    }

    getHtml(model: PdfDocument): string {
      return `
        <html>
        <head>
        <style>
          html {
            font-size: medium;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          body > * {
            zoom: ` + model.zoom + `;
          }
          .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
          }
          .table > thead > tr > th,
          .table > tbody > tr > th,
          .table > tfoot > tr > th,
          .table > thead > tr > td,
          .table > tbody > tr > td,
          .table > tfoot > tr > td {
            padding: 8px;
            line-height: 1.42857143;
            vertical-align: top;
            border-top: 1px solid #ddd;
          }
          .table > thead > tr > th {
            vertical-align: bottom;
            border-bottom: 2px solid #ddd;
          }
          .table > caption + thead > tr:first-child > th,
          .table > colgroup + thead > tr:first-child > th,
          .table > thead:first-child > tr:first-child > th,
          .table > caption + thead > tr:first-child > td,
          .table > colgroup + thead > tr:first-child > td,
          .table > thead:first-child > tr:first-child > td {
            border-top: 0;
          }
          .table > tbody + tbody {
            border-top: 2px solid #ddd;
          }
          .table .table {
            background-color: #fff;
          }
          table col[class*="col-"] {
            position: static;
            display: table-column;
            float: none;
          }
          table td[class*="col-"],
          table th[class*="col-"] {
            position: static;
            display: table-cell;
            float: none;
          }
          .table > thead > tr > td.active,
          .table > tbody > tr > td.active,
          .table > tfoot > tr > td.active,
          .table > thead > tr > th.active,
          .table > tbody > tr > th.active,
          .table > tfoot > tr > th.active,
          .table > thead > tr.active > td,
          .table > tbody > tr.active > td,
          .table > tfoot > tr.active > td,
          .table > thead > tr.active > th,
          .table > tbody > tr.active > th,
          .table > tfoot > tr.active > th {
            background-color: #f5f5f5;
          }
          .table > thead > tr > td.success,
          .table > tbody > tr > td.success,
          .table > tfoot > tr > td.success,
          .table > thead > tr > th.success,
          .table > tbody > tr > th.success,
          .table > tfoot > tr > th.success,
          .table > thead > tr.success > td,
          .table > tbody > tr.success > td,
          .table > tfoot > tr.success > td,
          .table > thead > tr.success > th,
          .table > tbody > tr.success > th,
          .table > tfoot > tr.success > th {
            background-color: #dff0d8;
          }
          .table > thead > tr > td.info,
          .table > tbody > tr > td.info,
          .table > tfoot > tr > td.info,
          .table > thead > tr > th.info,
          .table > tbody > tr > th.info,
          .table > tfoot > tr > th.info,
          .table > thead > tr.info > td,
          .table > tbody > tr.info > td,
          .table > tfoot > tr.info > td,
          .table > thead > tr.info > th,
          .table > tbody > tr.info > th,
          .table > tfoot > tr.info > th {
            background-color: #d9edf7;
          }
          .table > thead > tr > td.warning,
          .table > tbody > tr > td.warning,
          .table > tfoot > tr > td.warning,
          .table > thead > tr > th.warning,
          .table > tbody > tr > th.warning,
          .table > tfoot > tr > th.warning,
          .table > thead > tr.warning > td,
          .table > tbody > tr.warning > td,
          .table > tfoot > tr.warning > td,
          .table > thead > tr.warning > th,
          .table > tbody > tr.warning > th,
          .table > tfoot > tr.warning > th {
            background-color: #fcf8e3;
          }
          .table > thead > tr > td.danger,
          .table > tbody > tr > td.danger,
          .table > tfoot > tr > td.danger,
          .table > thead > tr > th.danger,
          .table > tbody > tr > th.danger,
          .table > tfoot > tr > th.danger,
          .table > thead > tr.danger > td,
          .table > tbody > tr.danger > td,
          .table > tfoot > tr.danger > td,
          .table > thead > tr.danger > th,
          .table > tbody > tr.danger > th,
          .table > tfoot > tr.danger > th {
            background-color: #f2dede;
          }
          .table-responsive {
            min-height: .01%;
            overflow-x: auto;
          }
          .pdfDocument {
            position: relative;
            border: 0px;
            width: calc(210mm * 1.25);
            height: calc(297mm * 1.25);
            page-break-after: always;
          }
          .pdfBarcode {
            position: relative;
            border: 0px;
            width: calc(60mm * 1.25);
            height: calc(40mm * 1.25);
            page-break-after: always;
          }
        </style>
        </head>
        <body>` + model.content + `</body>
        </html>`;
    }

    htmlToPdf(model: PdfDocument): Observable<Blob> {
        model.content = this.getHtml(model);
        return this.http.post('/api/pdf', model, { headers: Helpers.getHeaders(), responseType: ResponseContentType.Blob })
            .map(result => <Blob>result.blob());
    }

    sendMail(model: PdfDocument): Observable<PdfDocument> {
        model.content = this.getHtml(model);
        return this.http.post('/api/pdf/email', model, { headers: Helpers.getHeaders() })
            .map(result => <PdfDocument>result.json());
    }

    sendHtmlMail(model: PdfDocument): Observable<PdfDocument> {
        model.content = this.getHtml(model);
        return this.http.post('/api/email', model, { headers: Helpers.getHeaders() })
            .map(result => <PdfDocument>result.json());
    }

    downloadCsv(fileName: String): Observable<Blob> {
      return this.http.get('/csv/' + fileName, { headers: Helpers.getHeaders(), responseType: ResponseContentType.Blob })
          .map(result => <Blob>result.blob());
    }

    getBaskets(): Observable<Basket[]> {
      return this.http.get('/api/baskets', { headers: Helpers.getHeaders() })
          .map(result => <Basket[]>result.json());
    }
}
