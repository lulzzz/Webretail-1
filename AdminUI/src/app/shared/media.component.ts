import { Component, OnInit, Input, Output } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { CompanyService } from '../services/company.service';
import { Media } from './../shared/models';
import { SessionService } from './../services/session.service';

@Component({
    selector: 'app-media',
    templateUrl: 'media.component.html'
})

export class MediaComponent implements OnInit {
    @Output() @Input() media: Media;
    @Input() medias: Media[];
    selectedMedia: string;

    constructor(private confirmationService: ConfirmationService,
                private sessionService: SessionService,
                private companyService: CompanyService) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        if (this.media) {
            this.medias = [];
            this.medias.push(this.media);
        }
        if (this.medias.length > 0) {
            this.selectMedia(this.medias[0].name);
        }
    }

    selectMedia(name: string) {
        this.selectedMedia = '/media/' + name;
    }

    myUploader(event, form) {
        const formDate: FormData = new FormData();
        event.files.forEach(file => {
            formDate.append('file[]', file, file.name);
        });
        // formDate.append('yourInformation', JSON.stringify(yourInformation));
        this.companyService.upload(formDate).subscribe(res => {
            res.forEach(media => {
                if (this.media) {
                    this.media.contentType = media.contentType;
                    this.media.name = media.name;
                } else {
                    this.medias.push(media);
                }
                this.selectMedia(media.name);
            });
            form.clear();
        });
    }

    deleteMediaClick(item) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this media?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                const index = this.medias.indexOf(item);
                this.medias.splice(index, 1);
            }
        });
    }
}
