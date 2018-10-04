import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() showAccountSelector = true;
  @Input() h1 = 'Ad Hoc Disposable Temporary Email';
  @Input() h2 = 'The temp mail service to keep your real email safe';

  constructor(           iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'envelopes',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/envelopes.svg'));
    iconRegistry.addSvgIcon(
      'sky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sky.svg'));
  }

  ngOnInit() {
  }

}
