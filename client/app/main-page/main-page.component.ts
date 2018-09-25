import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {DeviceService} from '../device.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  account: string;
  hideToolbarComponents = true;
  routerSub: Subscription;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, public deviceService: DeviceService) {
    iconRegistry.addSvgIcon(
      'ahem-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/ahem_logo_icon.svg'));
      this.routerSub = this.router.events.subscribe(val => {
        this.router.url !== '/' ? this.hideToolbarComponents = false : this.hideToolbarComponents = true;
        this.account = this.router.url.split('account/').pop().split('/').shift();
      });
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
