import {Injectable, Optional, Inject, OnInit} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {EmailInfo} from '../../model/email-info-model';
import {EmailDetails} from '../../model/email-details-model';
import {AhemProperties} from '../../model/properties-model';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
enum SortBy {
  Timestamp, Sender, Subject
}
@Injectable()
export class ApiService {



  baseUri: string;
  emails: BehaviorSubject<Array<EmailInfo>> = new BehaviorSubject<Array<EmailInfo>>([]);


  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUri = origin || '';
  }

  getProperties(): Observable<AhemProperties> {
    return this.http.get<AhemProperties>(this.baseUri + '/api/properties');
  }

  listMailboxesAutoComplete(prefix: string): any {
    const url = this.baseUri + '/api/mailbox/autocomplete';
    return this.http.post(url, {prefix: prefix});
  }

  listMailboxEmails(mailbox: string) {
    const url: string = this.baseUri + '/api/mailbox/' + mailbox + '/email';
    this.http.get<Array<EmailInfo>>(url).subscribe(emails => {
      emails = this.sortEmails(emails, SortBy.Timestamp, true);
      this.emails.next(emails);
    }, error => {
      if (error.status === 404) {
        this.emails.next([]);
      }
      });
  }

  getEmailContent(mailbox: string, emailId: string): Observable<EmailDetails> {
    const url: string = this.baseUri + '/api/mailbox/' + mailbox + '/email/' + emailId;
    return this.http.get<EmailDetails>(url);
  }

  markAsReadOrUnread(mailbox: string, emailId: string, isRead: boolean) {
    const url: string = this.baseUri + '/api/mailbox/' + mailbox + '/email/' + emailId;
    const body = { 'isRead': isRead};
    return this.http.patch(url, body);
  }


  deleteEmail(mailbox: string, timestamp: string) {
    const url: string = this.baseUri + '/api/mailbox/' + mailbox + '/email/' + timestamp;
    return this.http.delete(url);
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

}
