import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MailboxViewComponent} from './mailbox-view/mailbox-view.component';
import {MailboxEmailsListComponent} from './mailbox-emails-list/mailbox-emails-list.component';

const routes: Routes = [
  {
    path: '',
    component: MailboxViewComponent,
    pathMatch: 'full'
  },
  {
    path: ':mailbox',
    component: MailboxEmailsListComponent
  },
  {
    path: ':mailbox/:emailId',
    component: MailboxEmailsListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailboxRoutingModule { }
