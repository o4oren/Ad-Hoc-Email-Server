import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";

@Component({
  selector: 'ahem-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AHEM - Ad Hoc Email Server';

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ahem-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/ahem_logo_icon.svg'))
  }
}
