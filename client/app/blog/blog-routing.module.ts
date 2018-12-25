import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {BlogPostPageComponent} from './blog-post-page/blog-post-page.component';

const routes: Routes = [
  { path: '', component: BlogComponent},
  { path: 'post/:blogEntryName', component: BlogPostPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
