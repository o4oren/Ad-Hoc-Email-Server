import { Injectable } from '@angular/core';
import {BlogEntry} from '../model/blog-entry-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  blogEntries: Array<BlogEntry> = [
      {
        date: new Date('Nov 13, 2018').toString(),
        title: 'How to setup you own disposable email server',
        imageUrl: '/assets/images/happy-bluish.png',
        name: 'how-to-set-up-your-own-disposable-email-server'
      }
    ];

  constructor() { }

  getBlogPostByName(blogPostName) {
    return this.blogEntries.filter(entry => entry.name === blogPostName);
  }
}
