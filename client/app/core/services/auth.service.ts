import {Inject, Injectable, Optional} from '@angular/core';
import {TokenResponse} from '../../model/token-response-model';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {APP_BASE_HREF} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUri: string;

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUri = origin || '';
  }


  public getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      this.authenticate();
      return '';
    }
  }

  authenticate(): any {
    this.http.post<TokenResponse>(this.baseUri + '/auth/authenticate', {}).subscribe(result => {
      localStorage.setItem('token', result.token);
    });
  }
}
