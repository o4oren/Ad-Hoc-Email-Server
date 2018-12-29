import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {BlogPostPageComponent} from './blog-post-page/blog-post-page.component';
import {HowToSetUpYourOwnDisposableMailServerComponent} from './posts/how-to-set-up-your-own-disposable-mail-server/how-to-set-up-your-own-disposable-mail-server.component';

const routes: Routes = [
  { path: '', component: BlogComponent},
  { path: 'post', component: BlogPostPageComponent, children: [
      {path: 'how-to-set-up-your-own-disposable-email-server', component: HowToSetUpYourOwnDisposableMailServerComponent}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
