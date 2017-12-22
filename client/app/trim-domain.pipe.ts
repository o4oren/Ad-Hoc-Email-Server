import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimDomain'
})
export class TrimDomainPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split('@')[0];
  }

}
