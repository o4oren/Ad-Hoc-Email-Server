import { NgModule } from '@angular/core';
import {AccountViewPageComponent} from '../account-view-page/account-view-page.component';
import {LandingPageComponent} from '../landing-page/landing-page.component';
import {ApiDocumentationComponent} from '../api-documentation/api-documentation.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component:  LandingPageComponent},
  { path: 'help/api', component: ApiDocumentationComponent},
  { path: 'doc/api', component: ApiDocumentationComponent},
  { path: 'account', component: AccountViewPageComponent, pathMatch: 'full'},
  { path: 'account/:account', component: AccountViewPageComponent},
  { path: 'account/:account/:emailId', component: AccountViewPageComponent},
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
