import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'parseUrl'
})
export class ParseUrlPipe implements PipeTransform {
  transform(value: string): string {
    return environment.apiUrl + '/' + value;
  }
}
