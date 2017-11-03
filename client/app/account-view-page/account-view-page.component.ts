import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {EmailInfo} from "../model/email-info-model";
import {EmailDetails} from "../model/email-details-model";

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
  readEmails: Array<string> = [];
  readUnreadIcon: string;
  readUnreadText: string;
  emailId: string;

  @Output() onAccountDetermined: EventEmitter<string> = new EventEmitter();


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'].toLowerCase();
      this.emailId = params['emailId'];
      this.onAccountDetermined.emit(this.account);
      this.getAccountEmails();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getAccountEmails(): any{
    if(localStorage.getItem(this.account + '_read_emails')!= null)
      this.readEmails = JSON.parse(localStorage.getItem(this.account + '_read_emails'));
    this.apiService.listAccountsEmails(this.account).subscribe(
      emails => {
      this.emails = this.sortEmails(emails, SortBy.Timestamp, false);
      this.updateReadEmails();
      this.selectEmail(this.getEmailFromTimeStamp(this.emailId));
    }, err => {
        this.emails = [];
        this.selectedEmail = null;
        console.error(err);
    });
  }

  clickedEmail(clickedEmail: EmailInfo) {
    this.router.navigateByUrl(this.account + "/" + clickedEmail.emailId);
  }


  selectEmail(emailInfo:EmailInfo) {
    if(emailInfo) {
      this.selectedEmail = emailInfo;

      for(let e of this.emails) {
        e.timestamp == this.selectedEmail.timestamp ? e.isSelected = true : e.isSelected = false;
      }
      if(!this.readEmails.includes(emailInfo.timestamp))
        this.readEmails.push(emailInfo.timestamp);
      this.updateReadEmails();
      this.readUnreadIcon = 'fa-envelope';
      this.readUnreadText = 'unread';

    }
  }

  sortEmails(emailsArrary: EmailInfo[], sortBy: SortBy, reverse: boolean): EmailInfo[] {

    emailsArrary.sort((a,b) => {
      if(reverse)
        return Number(b.timestamp) - Number(a.timestamp);
      return Number(a.timestamp) - Number(b.timestamp);
      });
    return emailsArrary;
  }

  updateReadEmails() {
    localStorage.setItem(this.account + '_read_emails', JSON.stringify(this.readEmails));
    this.emails.forEach(e => {
        this.readEmails.includes(e.timestamp) ? e.isRead = true : e.isRead = false;
      }
    );
  }

  markAsReadOrUnread() {
    if(this.readEmails.includes(this.selectedEmail.timestamp)){
      var index = this.readEmails.indexOf(this.selectedEmail.timestamp);
      this.readEmails.splice(index, 1);
      this.updateReadEmails();
      this.readUnreadIcon = 'fa-envelope-open';
      this.readUnreadText = 'read';
      return;
    }

    this.readEmails.push(this.selectedEmail.timestamp);
    this.updateReadEmails();
    this.readUnreadIcon = 'fa-envelope';
    this.readUnreadText = 'unread';

  }


  deleteFile() {
    this.apiService.deleteEmail(this.account, this.selectedEmail.emailId).subscribe(
      result => {
        this.getAccountEmails();
        this.selectedEmail = null;
      },
      err => {
        console.log('error!!!!', err); //TODO popup message
      }
    );
  }

  private getEmailFromTimeStamp(emailId: string): EmailInfo {
    return this.emails.filter(email => email.emailId === emailId)[0];
  }
}
