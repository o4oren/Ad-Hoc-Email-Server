import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {BlogEntry} from '../../model/blog-entry-model';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  @Input() blogEntry: BlogEntry;
  htmlShort: string;
  baseUri: string;

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUri = origin || '';
  }

  ngOnInit() {
    this.http.get(this.baseUri + this.blogEntry.bodyShortUrl, {responseType: 'text'}).subscribe(res => {
      this.htmlShort = res;
    });
  }

}
