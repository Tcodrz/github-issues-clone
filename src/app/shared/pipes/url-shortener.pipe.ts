import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlShortener'
})
export class UrlShortenerPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return null;
    }
    const values = value.split('/');
    const newValue = values[4].concat('/').concat(values[5]);
    return newValue;
  }

}
