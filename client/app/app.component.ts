import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import {AuthService} from './core/services/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AHEM - Ad Hoc Email Server';
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    angulartics2GoogleAnalytics.startTracking();
  }

  ngOnInit() {
    this.authService.authenticate().subscribe((res => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('access_token', res.token);
      }
    })
    );
  }
}
