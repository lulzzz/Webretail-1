import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  template: `<iframe src="http://www.webretail.cloud/wp-admin" frameborder="0" allowfullscreen></iframe>`,
})
export class FrameComponent implements OnInit {
    @Input() url: string;

    ngOnInit() {
      if (!this.url) {
          this.url = 'https://www.webretail.cloud/wp-admin';
      }
  }
}
