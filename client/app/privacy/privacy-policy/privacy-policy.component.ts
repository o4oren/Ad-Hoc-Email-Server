import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent implements OnInit {


  constructor(titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - Privacy Policy');
    metaService.updateTag({ name: 'description', content: 'AHEM - Temporary Disposable Email Service - Privacy Policy. '});

  }

  ngOnInit() {
  }

}
