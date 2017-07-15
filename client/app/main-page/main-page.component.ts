import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy{

  account: string;
  paramsSub: Subscription;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ahem-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/ahem_logo_icon.svg'));

  }

  ngOnInit(): void {
    }
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }


}
