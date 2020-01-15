import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF, isPlatformBrowser} from '@angular/common';
import io from 'socket.io-client';
import {Subject} from 'rxjs/internal/Subject';
import {EmailInfo} from '../../model/email-info-model';
import {EmailCount} from '../../model/email-count-model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  baseUri: string;
  socket;


  emailCount: Subject<EmailCount> = new Subject<EmailCount>();

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.baseUri = origin || '';
    if (isPlatformBrowser(this.platformId)) { // check if this is runing in browser
      this.socket = io(APP_BASE_HREF); // call io constructor
      console.log(this.socket)
      this.initSocket(); // do the all initilization, e.g. this.socket.on('message', msg => {})
    }
  }

  initSocket() {
    this.socket.on('emailCount', count => this.emailCount.next(count));
  }
}
