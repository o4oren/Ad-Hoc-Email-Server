import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

  @Output() onAccountDetermined: EventEmitter<string> = new EventEmitter();


  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
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
    this.apiService.listAccountsEmails(this.account).subscribe(emails => {
      this.emails = emails;
      this.sortEmails(SortBy.Timestamp, true);
      this.updateReadEmails();
    });
  }

  selectEmail(clickedEmail:EmailInfo) {
    if(clickedEmail) {
      this.selectedEmail = clickedEmail;

      for(let e of this.emails) {
        e.timestamp == this.selectedEmail.timestamp ? e.isSelected = true : e.isSelected = false;
      }
      if(!this.readEmails.includes(clickedEmail.timestamp))
        this.readEmails.push(clickedEmail.timestamp);
      this.updateReadEmails();
      this.readUnreadIcon = 'fa-envelope-o';
      this.readUnreadText = 'unread';

    }
  }

  sortEmails(sortBy: SortBy, reverse: boolean) {

    this.emails.sort((a,b) => {
      if(reverse)
        return Number(b.timestamp) - Number(a.timestamp);
      return Number(a.timestamp) - Number(b.timestamp);
      });
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
      this.readUnreadIcon = 'fa-envelope-open-o';
      this.readUnreadText = 'read';
      return;
    }

    this.readEmails.push(this.selectedEmail.timestamp);
    this.updateReadEmails();
    this.readUnreadIcon = 'fa-envelope-o';
    this.readUnreadText = 'unread';

  }


  deleteFile() {
    this.apiService.deleteEmail(this.account, this.selectedEmail.timestamp).subscribe(
      result => {
        this.getAccountEmails();
        this.selectedEmail = null;
      },
      err => {
        console.log('error!!!!', err); //TODO popup message
      }
    );
  }

}
