import { Headers } from '@angular/http';
import { SelectItem, TreeNode } from 'primeng/primeng';
import { Company, Translation } from './models';

export class Helpers {

    static currency = 'USD';
    static utc = 'UTC';
    static locales: Translation[] = [];

    static distinct(a: any[]): any[] {
        const seen: any = {};
        const out: any[] = [];
        const len = a.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            const item = a[i];
            if (seen[item.label] !== 1) {
                seen[item.label] = 1;
                out[j++] = item;
            }
        }
        return out;
    }

    static getHeaders(): Headers {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    static newSelectItem(value: any, label?: string): SelectItem {
        return <SelectItem>{ label: label ? label : value, value: value };
    }

    static newNode(label: string, data: string, type: string): TreeNode {
        return <TreeNode>{
                'label': label,
                'data': data,
                'type': type,
                'children': []
        };
    }

    static getUnitOfMeasure(): SelectItem[] {
        return <SelectItem[]>[
            Helpers.newSelectItem('QT', 'Quantity'),
            Helpers.newSelectItem('MT', 'Meter'),
            Helpers.newSelectItem('KG', 'Kilogram')
        ];
    }

    static setInfos(company: Company) {
        this.currency = company.companyCurrency;
        this.utc = company.companyUtc;
        if (company.companyLocales.length > 0) {
            this.locales = company.companyLocales;
        } else {
            this.locales.push(new Translation('EN', 'English'));
            this.locales.push(new Translation('IT', 'Italian'));
            company.companyLocales = this.locales;
        }
    }
}
