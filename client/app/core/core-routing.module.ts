import { NgModule } from '@angular/core';
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
    path: 'mailbox',
    loadChildren: '../mailbox/mailbox.module#MailboxModule'},
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
