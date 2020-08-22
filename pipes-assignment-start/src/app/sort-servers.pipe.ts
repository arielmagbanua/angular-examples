import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortServers'
})
export class SortServersPipe implements PipeTransform {
  transform(
    value: { instanceType: string, name: string, status: string, started: Date }[],
    direction: string = 'asc'
  ): any {
    if (value.length === 0) {
      return value;
    }

    return direction === 'asc' ? this.ascending(value) : this.descending(value);
  }

  ascending(value: any[]) {
    return value.sort((a, b) => {
      if ( a.name < b.name ) {
        return -1;
      }
      if ( a.name > b.name ) {
        return 1;
      }
      return 0;
    });
  }

  descending(value: any[]) {
    return value.sort((a, b) => {
      if ( a.name > b.name ) {
        return -1;
      }
      if ( a.name < b.name ) {
        return 1;
      }
      return 0;
    });
  }
}
