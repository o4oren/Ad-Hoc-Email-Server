import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../core/services/config.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  h1 = 'AHEM - Ad Hoc Disposable Temporary Email FAQ';
  h2 = 'Frequently Asked Questions';

  properties = ConfigService.properties;

  constructor(titleService: Title, metaService: Meta) {

    titleService.setTitle('AHEM - Ad-Hoc Email FAQ');
    metaService.updateTag({
      name: 'description', content: 'AHEM - Ad Hoc Email Service - Frequently Asked Questions.'
    });
  }

  ngOnInit() {
  }
}
