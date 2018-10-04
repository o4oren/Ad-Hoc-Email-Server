import { NgModule } from '@angular/core';
import {ApiDocumentationComponent} from '../help/api-documentation/api-documentation.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: '../home/home.module#HomeModule',
  },
  {
    path: 'help',
    loadChildren: '../help/help.module#HelpModule',
  },
  {
    path: 'account',
    loadChildren: '../account-view/account-view.module#AccountViewModule'},
  {
    path: 'privacy',
    loadChildren: '../privacy/privacy.module#PrivacyModule',
  },
  {
    path: '**',
    loadChildren: '../page-not-found/page-not-found.module#PageNotFoundModule',
  }];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [
    RouterModule
  ]
})



export class CoreRoutingModule {
}
