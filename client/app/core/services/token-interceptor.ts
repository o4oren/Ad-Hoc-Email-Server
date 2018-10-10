///<reference path="../../../../node_modules/@angular/common/http/src/interceptor.d.ts"/>
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable, Injector} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

// Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('x-access-token', this.apiService.getToken())});

    console.log('Sending request with new header now ...');

// send the newly created request
    return next.handle(authReq);
  }
}
