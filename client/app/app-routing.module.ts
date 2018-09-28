import { NgModule } from '@angular/core';
import {AccountViewPageComponent} from './account-view-page/account-view-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', component:  LandingPageComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'help/api', component: ApiDocumentationComponent},
  { path: 'doc/api', component: ApiDocumentationComponent},
  { path: 'account', component: AccountViewPageComponent, pathMatch: 'full'},
  { path: 'account/:account', component: AccountViewPageComponent},
  { path: 'account/:account/:emailId', component: AccountViewPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})



export class AppRoutingModule {
}
