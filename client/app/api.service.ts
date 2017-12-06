import {Injectable, Optional, Inject, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class ApiService {

  baseUri: string;
  private _properties: Observable<any> = null;

  constructor(private http: Http, @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUri = origin || '';
  }

  getProperties(): any {
    return this._properties = this.http.get(this.baseUri + '/api/properties').map(res => res.json());
  }


  listAccountsAutoComplete(prefix: string): any {
    const url = this.baseUri + '/api/account/autocomplete';
    return this.http.post(url, {prefix: prefix}).map(res => res.json());
  }

  listAccountsEmails(account: string) {
    const url: string = this.baseUri + '/api/account/' + account;
    return this.http.get(url).map(res => res.json());
  }

  getEmailContent(account: string, emailId: string) {
    const url: string = this.baseUri + '/api/account/' + account + '/' + emailId;
    return this.http.get(url).map(res => res.json());
  }

  markAsReadOrUnread(account: string, emailId: string, isRead: boolean) {
    const url: string = this.baseUri + '/api/account/' + account + '/' + emailId;
    const body = { 'isRead': isRead};
    return this.http.patch(url, body).map(res => res.json());
  }


  deleteEmail(account: string, timestamp: string) {
    const url: string = this.baseUri + '/api/account/' + account + '/' + timestamp;
    return this.http.delete(url).map(res => res.json()).catch((error: any) => {
      if (error.status < 400 ||  error.status === 500) {
        return Observable.throw(new Error(error.status));
      }
    });
  }

}
