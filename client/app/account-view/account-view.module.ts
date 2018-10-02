import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountViewRoutingModule } from './account-view-routing.module';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountEmailsComponent } from './account-emails/account-emails.component';
import {EmailViewComponent} from './email-view/email-view.component';
import {MatCardModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {AttachmentsComponent} from './attachments/attachments.component';
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EmailInfo} from '../model/email-info-model';
import {EmailInfoComponent} from './email-info/email-info.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    SharedModule,
    MomentModule,
    FontAwesomeModule,
    AccountViewRoutingModule,
  ],
  declarations: [
    AccountViewComponent,
    AccountEmailsComponent,
    EmailViewComponent,
    EmailInfoComponent,
    AttachmentsComponent
  ]
})
export class AccountViewModule { }
