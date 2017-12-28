import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';
import { Media } from 'app/shared/models';

@Pipe({
  name: 'parseUrl'
})
export class ParseUrlPipe implements PipeTransform {
  transform(value: Media[]): string {
    const url = value.length > 0 ? 'media/' + value[0].name : 'media/default.jpg';
    return environment.apiUrl + '/' + url;
  }
}
