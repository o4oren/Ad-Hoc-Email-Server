import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {DeviceService} from '../device.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ahem-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  properties: any = {};
  constructor(public apiService: ApiService, public deviceService: DeviceService, titleService: Title) {
    titleService.setTitle('AHEM - Disposable Temporary E-Mail Address');
   }

  ngOnInit() {
    this.apiService.getProperties().subscribe(properties => this.properties = properties);
  }

  onSelected() {}

}
