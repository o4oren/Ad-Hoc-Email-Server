import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {BlogEntry} from '../../model/blog-entry-model';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SeoService} from '../../core/services/seo.service';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css']
})
export class BlogPostPageComponent implements OnInit {

  blogEntry: BlogEntry;
  baseUri: string;
  body: string;
  h2 = 'AHEM - Ad Hoc Email';

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private blogService: BlogService) {
    this.baseUri = origin || '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogEntry = this.blogService.getBlogPostByName(params['blogEntryName'])[0];
      this.seoService.setTitle(this.blogEntry.title);
      this.seoService.updateMetaTag({name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address blog post: ' +
        this.blogEntry.title}
      );
      this.http.get(this.baseUri + '/assets/blog/' + this.blogEntry.name + '.html', {responseType: 'text'}).subscribe(res => {
        this.body = res;
      });
    });
  }

}
