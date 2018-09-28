import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {DeviceService} from '../device.service';
import {Meta, Title} from '@angular/platform-browser';
import * as propertisJson from '../assets/properties.json';

@Component({
  selector: 'ahem-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public const properties = propertisJson;

  constructor(public apiService: ApiService, public deviceService: DeviceService, titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - an ;Ad-Hoc Disposable Temporary Email Address');
    metaService.updateTag({ name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address. ' +
      'Ad-hoc - created on demand. Disposable - ' +
      'you can throw it away. ' +
      'Temporary - your emails will be delete automatically. Don\'t expose your real E-mail. Use AHEM to fight SPAM.' });
  }

  ngOnInit() {
  }

  onSelected() {}

}
