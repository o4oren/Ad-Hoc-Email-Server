import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimDomain'
})
export class TrimDomainPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    console.log('does pipe work?', value.split('@')[0]);
    return value.split('@')[0];
  }

}
