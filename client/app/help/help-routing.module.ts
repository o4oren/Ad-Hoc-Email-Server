import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {FaqComponent} from './faq/faq.component';

const routes: Routes = [
  {
    path: 'api',
    component: ApiDocumentationComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
