import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, @Inject(DOCUMENT) private doc, private metaService: Meta) {
  }
  setTitle(title: string) {
     this.title.setTitle(title);
  }
  getPageTitle() {
     return this.title.getTitle();
  }
  updateMetaTag(name: string, content: string) {
    this.metaService.updateTag({name: name, conent: content});
 }
  createLinkForCanonicalURL() {
     const link: HTMLLinkElement = this.doc.createElement('link');
     link.setAttribute('rel', 'canonical');
     this.doc.head.appendChild(link);
     link.setAttribute('href', this.doc.URL);
  }
}
