import { NgModule } from '@angular/core';
import {AccountViewPageComponent} from '../account-view-page/account-view-page.component';
import {ApiDocumentationComponent} from '../api-documentation/api-documentation.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
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
