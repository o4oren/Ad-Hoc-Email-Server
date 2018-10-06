import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../core/services/api.service';
import {Meta, Title} from '@angular/platform-browser';
import {EmailInfo} from '../../model/email-info-model';
import {Subscription} from 'rxjs/internal/Subscription';
import {ConfigService} from '../../core/services/config.service';

enum SortBy {
  Timestamp, Sender, Subject
}

@Component({
  selector: 'app-account-emails',
  templateUrl: './account-emails.component.html',
  styleUrls: ['./account-emails.component.css']
})
export class AccountEmailsComponent implements OnInit, OnDestroy {
  paramsSub: Subscription;
  account: string;
  emails: Array<EmailInfo> = [];
  selectedEmail: EmailInfo;
  emailId: string;

  constructor(private apiService: ApiService,
      private route: ActivatedRoute,
      private router: Router,
      private titleService: Title,
      private metaService: Meta) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['account'] == null) {
        this.metaService.updateTag({ name: 'description', content: 'AHEM - accounts'});
        this.titleService.setTitle('AHEM - Accounts');

      } else {
      }
      this.emailId = params['emailId'];
      if (!this.account || this.account.toLowerCase() !== params['account'].toLowerCase()) {
        this.account = params['account'].toLowerCase();
        this.metaService.updateTag({ name: 'description', content: 'AHEM - ' + this.account});
        this.titleService.setTitle('AHEM - ' + this.account);
        this.getAccountEmails();
      } else {
        this.selectEmail(this.getEmailFromTimeStamp(this.emailId));
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getAccountEmails(): any {
    this.apiService.listAccountsEmails(this.account).subscribe(
      emails => {
        this.emails = this.sortEmails(emails, SortBy.Timestamp, true);
        if (this.emailId) {
          this.selectEmail(this.getEmailFromTimeStamp(this.emailId));
        }
      }, err => {
        this.emails = [];
        this.selectedEmail = null;
        console.error(err);
      });
  }

  sortEmails(emailsArrary: EmailInfo[], sortBy: SortBy, reverse: boolean): EmailInfo[] {
    emailsArrary.sort((a, b) => {
      if (reverse) {
        return b.timestamp - a.timestamp;
      }
      return a.timestamp - b.timestamp;
    });
    return emailsArrary;
  }

  selectEmail(emailInfo: EmailInfo) {
    if (emailInfo) {
      if (!emailInfo.isRead) {
        emailInfo.isRead = true;
      }
      this.selectedEmail = emailInfo;
      this.apiService.markAsReadOrUnread(this.account, this.selectedEmail.emailId, true).subscribe();
    }
  }

  private getEmailFromTimeStamp(emailId: string): EmailInfo {
    return this.emails.filter(email => email.emailId === emailId)[0];
  }

  clickedEmail(email: EmailInfo) {
    this.selectEmail(email);
    this.router.navigateByUrl('/account/' + this.account + '/' + email.emailId);
  }

  deleteFile() {
    this.apiService.deleteEmail(this.account, this.selectedEmail.emailId).subscribe(
      result => {
        this.getAccountEmails();
        this.selectedEmail = null;
        this.router.navigateByUrl('/account/' + this.account);
      },
      err => {
        console.log('error!!!!', err); // TODO popup message
      }
    );
  }

  markAsReadOrUnread() {
      if (this.selectedEmail) {
        if (!this.selectedEmail.isRead) {
          this.selectedEmail.isRead = true;
        } else {
          this.selectedEmail.isRead = false;
        }
        this.apiService.markAsReadOrUnread(this.account, this.selectedEmail.emailId, this.selectedEmail.isRead).subscribe();
      }
  }

  getEmptyAccountText(): string {
    return this.account + '@' + ConfigService.properties.allowedDomains[0];
  }

}
