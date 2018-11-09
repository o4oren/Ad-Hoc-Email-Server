import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent implements OnInit {


  constructor(seoService: SeoService) {
    seoService.setTitle('AHEM - Privacy Policy');
    seoService.updateMetaTag({ name: 'description', content: 'AHEM - Temporary Disposable Email Service - Privacy Policy. '});

  }

  ngOnInit() {
  }

}
