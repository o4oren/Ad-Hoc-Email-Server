import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, @Inject(DOCUMENT) private doc) {
  }
  setPageTitle(title: string) {
     this.title.setTitle(title);
  }
  getPageTitle() {
     return this.title.getTitle();
  }
  createLinkForCanonicalURL() {
     const link: HTMLLinkElement = this.doc.createElement('link');
     link.setAttribute('rel', 'canonical');
     this.doc.head.appendChild(link);
     link.setAttribute('href', this.doc.URL.replace('http', 'https'));
  }
}
