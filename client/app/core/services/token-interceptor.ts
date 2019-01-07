///<reference path="../../../../node_modules/@angular/common/http/src/interceptor.d.ts"/>
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { tap, mergeMap } from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';
import {EmailInfo} from '../../model/email-info-model';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// Clone the request to add the new header if it is not an unauth call.
    if (req.url.includes('api/properties') || req.url.includes('assets')) {
      return next.handle(req);
    }

    let authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())});

// send the newly created request
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.authenticate().pipe(mergeMap(res => {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('access_token', res.token);
            }
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())});
            return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
              console.log('event', event);
              if (event instanceof HttpResponse && event.url.match(/\/api\/mailbox\/.+\/email$/g)) {
                this.apiService.emails.next(event.body);
              }
              return event;
            }));
          })).subscribe();
        } else if (err.status === 403) {
          console.log('Error 403', err);
        }
      }
    }));
  }
}
