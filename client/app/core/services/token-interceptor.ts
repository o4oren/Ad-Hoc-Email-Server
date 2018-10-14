///<reference path="../../../../node_modules/@angular/common/http/src/interceptor.d.ts"/>
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { tap, mergeMap } from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

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
            localStorage.setItem('access_token', res.token);
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())});
            return next.handle(authReq);
          })).subscribe();
        } else if (err.status === 403) {
          console.log('Error 403', err);
        }
      }
    }));
  }
}
