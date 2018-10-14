import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {TokenResponse} from '../../model/token-response-model';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {APP_BASE_HREF, isPlatformBrowser} from '@angular/common';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUri: string;

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.baseUri = origin || '';
  }


  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('access_token')) {
        return localStorage.getItem('access_token');
      }
    }

    return '';
  }

  authenticate(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.baseUri + '/api/auth/authenticate', {});
  }
}
