import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from '../api.service';
import {EmailInfo} from '../model/email-info-model';
import {MatSidenav} from '@angular/material/sidenav';
import {DeviceService} from '../device.service';


enum SortBy {
  Timestamp, Sender, Subject
}

@Component({
  selector: 'app-account-view-page',
  templateUrl: './account-view-page.component.html',
  styleUrls: ['./account-view-page.component.css']
})


export class AccountViewPageComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  account: string;
  emails: Array<EmailInfo>;
  selectedEmail: EmailInfo;
  readUnreadIcon: string;
  readUnreadText: string;
  emailId: string;

  @Output() onAccountDetermined: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
              public deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.emailId = params['emailId'];
      if (!this.account || this.account.toLowerCase() != params['account'].toLowerCase()) {
        this.account = params['account'].toLowerCase();
        this.onAccountDetermined.emit(this.account);
        this.getAccountEmails();
      } else {
        this.selectEmail(this.getEmailFromTimeStamp(this.emailId));
        this.closeSidenavIfMobile();
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
        this.closeSidenavIfMobile();
      } else {
        if (this.emails.length > 0) {
          // this.selectEmail(this.emails[0]); //TODO handle non empty mailbox vs empty mailbox
        }
      }

    }, err => {
        this.emails = [];
        this.selectedEmail = null;
        console.error(err);
    });
  }

  clickedEmail(clickedEmail: EmailInfo) {
    this.router.navigateByUrl('/account/' + this.account + '/' + clickedEmail.emailId);
  }


  selectEmail(emailInfo: EmailInfo) {
    if (emailInfo) {
      if (!emailInfo.isRead) {
        emailInfo.isRead = true;
      }
      this.selectedEmail = emailInfo;
      this.apiService.markAsReadOrUnread(this.account, this.selectedEmail.emailId, true).subscribe();
      this.readUnreadIcon = 'fa-envelope';
      this.readUnreadText = 'unread';
    }
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


  markAsReadOrUnread() {
      this.selectedEmail.isRead = !this.selectedEmail.isRead;
      this.apiService.markAsReadOrUnread(this.account, this.selectedEmail.emailId, this.selectedEmail.isRead).subscribe();
    if (this.selectedEmail.isRead) {
      this.readUnreadIcon = 'fa-envelope';
      this.readUnreadText = 'unread';
    } else {
      this.readUnreadIcon = 'fa-envelope-open';
      this.readUnreadText = 'read';
    }
      return;
  }



  deleteFile() {
    this.apiService.deleteEmail(this.account, this.selectedEmail.emailId).subscribe(
      result => {
        this.getAccountEmails();
        this.selectedEmail = null;
      },
      err => {
        console.log('error!!!!', err); // TODO popup message
      }
    );
  }

  private closeSidenavIfMobile() {
    if (this.deviceService.isSmallScreen()) {
      this.sidenav.close();
    }
  }

  private getEmailFromTimeStamp(emailId: string): EmailInfo {
    return this.emails.filter(email => email.emailId === emailId)[0];
  }
}
