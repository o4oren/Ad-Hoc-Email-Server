import { Component, OnInit } from '@angular/core';
import {BlogEntry} from '../../model/blog-entry-model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogEntries: Array<BlogEntry>;

  constructor() { }

  ngOnInit() {
    this.blogEntries = [
      {
        date: new Date('Nov 13, 2018').toString(),
        title: 'How to setup you own disposable email server',
        imageUrl: '/assets/images/happy-bluish.png',
        bodyUrl: '/assets/blog/how-to-set-up-your-own-disposable-email-server.html',
        bodyShortUrl: '/assets/blog/how-to-set-up-your-own-disposable-email-server.short.html'
      }
    ];

    console.log(this.blogEntries);
  }
}
