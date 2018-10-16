import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceService} from '../services/device.service';
import {MatIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/internal/Subscription';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mailbox: string;
  hideToolbarComponents = true;
  routerSub: Subscription;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, public deviceService: DeviceService) {
    iconRegistry.addSvgIcon(
      'ahem-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ahem-bluish.svg'));
    iconRegistry.addSvgIcon(
      'ahem-logo-text',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ahem-sm-side-text.svg'));
    this.routerSub = this.router.events.subscribe(val => {
      this.router.url !== '/' ? this.hideToolbarComponents = false : this.hideToolbarComponents = true;
      this.mailbox = this.router.url.split('mailbox/').pop().split('/').shift();
    });
  }

  updateClassesForMailboxPage(): any {
    if (this.mailbox) {
      return {
        'on-mailbox-page': true,
        'ahem-logo-text': false,
        'ahem-logo': false
      };
    }

    return {};
}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

}
