import { Injectable, Inject } from '@angular/core';
import {Title, DOCUMENT, Meta, MetaDefinition} from '@angular/platform-browser';

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
  updateMetaTag(tag: MetaDefinition) {
    this.metaService.updateTag(tag);
 }
  createLinkForCanonicalURL(cannonicalUrl?: string) {
     const link: HTMLLinkElement = this.doc.createElement('link');
     link.setAttribute('rel', 'canonical');
     this.doc.head.appendChild(link);
     if(cannonicalUrl) {
       link.setAttribute('href', cannonicalUrl);
     } else {
       link.setAttribute('href', this.doc.URL);
     }
  }
}

