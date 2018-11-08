import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {DeviceService} from '../../core/services/device.service';
import {ConfigService} from '../../core/services/config.service';
import {AhemProperties} from '../../model/properties-model';
import {HomePageItem} from '../home-page-item/home-page-item.component';
import {DurationPipe} from 'ngx-moment';
import {duration} from 'moment';
import { SeoService } from 'client/app/core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: AhemProperties;

  items: Array<HomePageItem> = [];
  constructor(public deviceService: DeviceService, seoService: SeoService ,titleService: Title,
    metaService: Meta, private durationPipe: DurationPipe) {

    titleService.setTitle('AHEM - an Ad-Hoc Disposable Temporary Email Address');
    seoService.createLinkForCanonicalURL();
    metaService.updateTag({
      name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address. ' +
      'Ad-hoc - created on demand. Disposable - ' +
      'you can throw it away. ' +
      'Temporary - your emails will be delete automatically. Don\'t expose your real E-mail. Use AHEM to fight SPAM.'
    });
    this.properties = ConfigService.properties;
  }

  ngOnInit() {
    this.createHomePageItems();
  }

  createHomePageItems() {
    this.items = [
      {
        title: 'Ad Hoc mailbox',
        text: 'No sign in page! No registration! No password! An ad hoc mailbox is created by just sending an email to its address.',
        iconName: 'paper-plane',
        iconGroup: 'far'
      },
      {
        title: 'Disposable email',
        text: 'Do not expose your real email. Dispose emails immediately. No strings attached.',
        iconName: 'trash-alt',
        iconGroup: 'far'
      },
      {
        title: 'Temporary email address',
        text: 'Emails are automatically deleted after '
        + this.durationPipe.transform(this.properties.emailDeleteAge + this.properties.emailDeleteInterval, 'seconds') + '.',
        iconName: 'clock',
        iconGroup: 'far'
      },
      {
        title: 'Avoid SPAM',
        text: 'Use an AHEM temporary email to prevent spam and phishing when signing in to online services and wifi networks.',
        iconName: 'user-secret',
        iconGroup: 'fas'
      },
      {
        title: 'Simple',
        text: 'Using AHEM is always simple and free. Just send an email to [mailbox of your choice]@ahem.email and check your ' +
        'disposable mailbox.',
        iconName: 'dove',
        iconGroup: 'fas'
      },
      {
        title: 'QA testing',
        text: 'Many software products use email. Using AHEM is a great way to test your product\'s ' +
        'email functionality. Send emails here, or use our RESTful API.',
        iconName: 'laptop-code',
        iconGroup: 'fas'
      },
      {
        title: 'High fidelity',
        text: 'Complex graphics within emails are rendered faithfully, ' +
        'to a much better result that some of the other temporary email solutions. ' +
        'You will see the email as the sender intended.',
        iconName: 'tv',
        iconGroup: 'fas'
      },
      {
        title: 'Mobile friendly',
        text: 'AHEM is responsive and is just as usable and on a small screen device.',
        iconName: 'mobile-alt',
        iconGroup: 'fas'
      }
    ];
  }
}
