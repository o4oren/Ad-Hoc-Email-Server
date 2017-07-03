import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  listAccountsAutoComplete(prefix: string): any {
    let url: string = "/api/account/autocomplete";
    return this.http.post(url, {prefix: prefix}).map(res => res.json());
  }


}
