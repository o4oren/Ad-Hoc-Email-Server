import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'htmlSanitizer'
})
export class HtmlSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, args?: any): any {
    // add http if emails contains "relative" links
    if (value.includes('href')) {
        value.replace('href="w', 'href="http://w');
    }
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
