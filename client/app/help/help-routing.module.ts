import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {FaqComponent} from './faq/faq.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {
    path: 'api',
    component: ApiDocumentationComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
