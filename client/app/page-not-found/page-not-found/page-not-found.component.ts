import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../../core/services/device.service';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  constructor(public deviceService: DeviceService, seoService: SeoService) {
    seoService.setTitle('AHEM - 404 Not Found!');
    seoService.updateMetaTag({ name: 'description', content: 'AHEM temporary disposable email server - 404 ' });

  }

  ngOnInit() {
  }


}
