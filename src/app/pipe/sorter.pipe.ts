import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: null | any[], sortby: string): any[] | null {

    if (!Array.isArray(value) || !sortby) {
      return value;
    }

    if (sortby==='') return value;
    else {
      return value.sort( (a, b) => {
        if ( a[sortby] < b[sortby] ){
          return -1;
        }
        if ( a[sortby] > b[sortby] ){
          return 1;
        }
        return 0;
      });
    }

  }

}
