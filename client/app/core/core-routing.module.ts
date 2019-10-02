import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'help',
    loadChildren: () => import('../help/help.module').then(m => m.HelpModule),
  },
  {
    path: 'mailbox',
    loadChildren: () => import('../mailbox/mailbox.module').then(m => m.MailboxModule)},
  {
    path: 'privacy',
    loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule),
  },
  {
    path: '**',
    loadChildren: () => import('../page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  }];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [
    RouterModule
  ]
})



export class CoreRoutingModule {
}
