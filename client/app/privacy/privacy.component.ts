import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'ahem-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyComponent implements OnInit {

  constructor(titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - Privacy Policy');
    metaService.updateTag({ name: 'description', content: 'AHEM - Temporary Disposable Email Service - Privacy Policy. '});

  }

  ngOnInit() {
  }

}
