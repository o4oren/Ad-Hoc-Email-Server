import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlCleanup'
})
export class HtmlCleanupPipe implements PipeTransform {

  transform(html: string, args?: any): any {
    let newHtml;
    if(html.includes("<html") && html.includes("<body")) {
      let part1 = html.split('<body')[1];
      let part2 = part1.slice(part1.indexOf('>') + 1);
      if(part2.startsWith('<style')) {
        part2 = part2.slice(part2.indexOf('<style'), part2.indexOf('</style>'));
      }
      let part3 = part2.split('</body>')[0];
      return part3;
    }

    return html;
  }

}
