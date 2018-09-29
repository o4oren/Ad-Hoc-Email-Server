import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DeviceService} from "../core/device.service";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'ahem-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  constructor(public deviceService: DeviceService, titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - 404 Not Found!');
    metaService.updateTag({ name: 'description', content: 'AHEM temporary disposable email server - 404 ' });

  }

  ngOnInit() {
  }
}
