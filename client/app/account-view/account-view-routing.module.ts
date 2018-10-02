import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountViewComponent} from './account-view/account-view.component';
import {AccountEmailsComponent} from './account-emails/account-emails.component';
import {EmailViewComponent} from './email-view/email-view.component';

const routes: Routes = [
  {
    path: '',
    component: AccountViewComponent,
    pathMatch: 'full'
  },
  {
    path: ':account',
    component: AccountEmailsComponent
  },
  {
    path: ':account/:emailId',
    component: EmailViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountViewRoutingModule { }
