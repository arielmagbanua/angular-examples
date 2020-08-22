import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number = 0): any {
    if (limit && value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
