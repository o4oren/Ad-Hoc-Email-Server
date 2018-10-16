import {Injectable, Optional, Inject, OnInit} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {EmailInfo} from '../../model/email-info-model';
import {EmailDetails} from '../../model/email-details-model';
import {AhemProperties} from '../../model/properties-model';

@Injectable()
export class ApiService {

  baseUri: string;

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

  listMailboxEmails(mailbox: string): Observable<Array<EmailInfo>> {
    const url: string = this.baseUri + '/api/mailbox/' + mailbox + '/email';
    return this.http.get<Array<EmailInfo>>(url);
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

}
