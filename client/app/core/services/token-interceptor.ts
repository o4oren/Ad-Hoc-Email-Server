///<reference path="../../../../node_modules/@angular/common/http/src/interceptor.d.ts"/>
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

// Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('x-access-token', this.authService.getToken())});

    console.log('Sending request with new header now ...');

// send the newly created request
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do wahtever
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.authenticate();
        }
      }
    }));
  }
}
