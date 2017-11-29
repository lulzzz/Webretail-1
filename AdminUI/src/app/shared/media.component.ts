import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Media } from './../shared/models';
import { SessionService } from './../services/session.service';

@Component({
    selector: 'app-media',
    templateUrl: 'media.component.html'
})

export class MediaComponent implements OnInit {
    @Input() medias: Media[];
    selectedMedia: string;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private sessionService: SessionService) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        if (this.medias.length > 0) {
            this.selectedMedia = this.medias[0].url;
        }
    }

    selectMedia(url: string) {
        this.selectedMedia = url;
    }

    onBeforeUpload(event) {
    }

    onUpload(event) {
        let index = this.medias.length;
        event.files.forEach(file => {
            index++;
            const media = new Media(file.name, 'Media/' + file.name, index);
            this.medias.push(media);
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
