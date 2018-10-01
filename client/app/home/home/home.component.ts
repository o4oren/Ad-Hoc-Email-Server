import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {DeviceService} from '../../core/device.service';
import {ApiService} from '../../core/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   properties: any = {
    serverBaseUri: 'http://www.ahem.email',
    mongoConnectUrl: 'mongodb://localhost:27017',
    dbName: 'ahem',
    appListenPort: 3000,
    smtpPort : 25,
    emailDeleteInterval : 86400,
    emailDeleteAge : 7200,
    allowAutocomplete : false,
    allowedDomains : ['ahem.email', 'mail.ahem.email', 'ahem-email.com']
  };

  constructor(public apiService: ApiService, public deviceService: DeviceService, titleService: Title, metaService: Meta) {
    titleService.setTitle('AHEM - an Ad-Hoc Disposable Temporary Email Address');
    metaService.updateTag({ name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address. ' +
      'Ad-hoc - created on demand. Disposable - ' +
      'you can throw it away. ' +
      'Temporary - your emails will be delete automatically. Don\'t expose your real E-mail. Use AHEM to fight SPAM.' });
    // this.properties = this.apiService.getProperties();
  }

  ngOnInit() {
  }

}
