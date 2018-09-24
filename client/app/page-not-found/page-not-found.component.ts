import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DeviceService} from "../device.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ahem-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  constructor(public deviceService: DeviceService, titleService: Title) {
    titleService.setTitle('AHEM - 404 Not Found!');
   }

  ngOnInit() {
  }
}
