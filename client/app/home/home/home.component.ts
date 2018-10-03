import { Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {DeviceService} from '../../core/services/device.service';
import {ConfigService} from '../../core/services/config.service';
import {AhemProperties} from '../../model/properties-model';
import {HomePageItem} from '../home-page-item/home-page-item.component';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   properties: AhemProperties;

   items: Array<HomePageItem> = [
     {
       title: 'Ad Hoc',
       text: 'No sign in! No registration! No password! An ad hoc mailbox is created just by sending an email to its address.',
       iconName: 'paper-plane',
       iconGroup: 'far'
     },
     {
       title: 'Disposable',
       text: 'Do not expose your real email, dispose received emails. No strings attached.',
       iconName: 'trash-alt',
       iconGroup: 'far'
     },
     {
       title: 'Temporary',
       text: 'Received emails with be automatically deleted after 24 hours.',
       iconName: 'clock',
       iconGroup: 'far'
     },
     {
       title: 'Simple and free',
       text: 'Using AHEM is always simple and free. Generate a random email address or select your own.',
       iconName: 'dove',
       iconGroup: 'fas'
     },
   ];

  constructor(public deviceService: DeviceService, titleService: Title, metaService: Meta,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'envelopes',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/envelopes.svg'));
    iconRegistry.addSvgIcon(
      'sky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sky.svg'));

    titleService.setTitle('AHEM - an Ad-Hoc Disposable Temporary Email Address');
    metaService.updateTag({ name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address. ' +
      'Ad-hoc - created on demand. Disposable - ' +
      'you can throw it away. ' +
      'Temporary - your emails will be delete automatically. Don\'t expose your real E-mail. Use AHEM to fight SPAM.' });
       this.properties = ConfigService.properties;
  }

  ngOnInit() {
  }

}
