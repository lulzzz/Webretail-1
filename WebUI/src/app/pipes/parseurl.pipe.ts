import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';
import { Media } from 'app/shared/models';

@Pipe({
  name: 'parseUrl'
})
export class ParseUrlPipe implements PipeTransform {
  transform(value: Media[]): string {
    const url = value.length > 0 ? value[0].url : 'Media/logo.jpg';
    return environment.apiUrl + '/' + url;
  }
}
