import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../core/services/config.service';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  h1 = 'About AHEM';
  h2 = 'Ad Hoc Temporary Email Service';

  constructor(seoService: SeoService) {

    seoService.setTitle('About AHEM - Ad-Hoc Email');
    seoService.updateMetaTag({
      name: 'description', content: 'About AHEM - Ad Hoc Email Service - Frequently Asked Questions.'
    });
  }

  ngOnInit() {
  }

}
