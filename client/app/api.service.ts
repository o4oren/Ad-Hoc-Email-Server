import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  listAccountsAutoComplete(prefix: string): any {
    let url: string = "/api/account/autocomplete";
    return this.http.post(url, {prefix: prefix}).map(res => res.json());
  }

  listAccountsEmails(account: string) {
    let url: string = "/api/account/" + account;
    return this.http.get(url).map(res => res.json());
  }

  getEmailContent(account: string, timestamp: string) {
    let url: string = "/api/account/" + account + "/" + timestamp;
    return this.http.get(url).map(res => res.json());
  }


}
