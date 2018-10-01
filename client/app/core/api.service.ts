import {Injectable, Optional, Inject, OnInit} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {EmailInfo} from '../model/email-info-model';
import {EmailDetails} from '../model/email-details-model';
import * as propertiesJson from '../../assets/properties.json';

@Injectable()
export class ApiService {

  baseUri: string;
  private _properties: any;

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this._properties = propertiesJson.default;
    this.baseUri = origin || '';
    console.log('base uri ' + this.baseUri);
    console.log('properties - from constructor:', this._properties);
  }

  getProperties(): any {
    return this._properties;
    console.log('properties - from get method:', this._properties);
  }


  listAccountsAutoComplete(prefix: string): any {
    const url = this.baseUri + '/api/account/autocomplete';
    return this.http.post(url, {prefix: prefix});
  }

  listAccountsEmails(account: string): Observable<Array<EmailInfo>> {
    const url: string = this.baseUri + '/api/account/' + account;
    return this.http.get<Array<EmailInfo>>(url);
  }

  getEmailContent(account: string, emailId: string): Observable<EmailDetails> {
    const url: string = this.baseUri + '/api/account/' + account + '/' + emailId;
    return this.http.get<EmailDetails>(url);
  }

  markAsReadOrUnread(account: string, emailId: string, isRead: boolean) {
    const url: string = this.baseUri + '/api/account/' + account + '/' + emailId;
    const body = { 'isRead': isRead};
    return this.http.patch(url, body);
  }


  deleteEmail(account: string, timestamp: string) {
    const url: string = this.baseUri + '/api/account/' + account + '/' + timestamp;
    return this.http.delete(url);
  }

}
