import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

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

  getEmailContent(account: string, emailId: string) {
    let url: string = "/api/account/" + account + "/" + emailId;
    return this.http.get(url).map(res => res.json());
  }

  deleteEmail(account: string, timestamp: string) {
    let url: string = "/api/account/" + account + "/" + timestamp;
    return this.http.delete(url).map(res => res.json()).catch((error: any) => {
      if (error.status < 400 ||  error.status ===500) {
        return Observable.throw(new Error(error.status));
      }
    });
  }

  getProperties() {
    return this.http.get("/api/properties").map(res => res.json());
  }



}
