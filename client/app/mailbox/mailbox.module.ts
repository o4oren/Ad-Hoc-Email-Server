import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailboxViewComponent } from './mailbox-view/mailbox-view.component';
import { MailboxEmailsListComponent } from './mailbox-emails-list/mailbox-emails-list.component';
import {EmailViewComponent} from './email-view/email-view.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import {AttachmentsComponent} from './attachments/attachments.component';
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EmailInfoComponent} from './email-info/email-info.component';
import {MomentModule} from 'ngx-moment';
import {MailboxRoutingModule} from './mailbox-routing.module';
import {AdsenseModule} from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    MomentModule,
    MatToolbarModule,
    FontAwesomeModule,
    AdsenseModule,
    MailboxRoutingModule
  ],
  declarations: [
    MailboxViewComponent,
    MailboxEmailsListComponent,
    EmailViewComponent,
    EmailInfoComponent,
    AttachmentsComponent
  ]
})
export class MailboxModule { }
