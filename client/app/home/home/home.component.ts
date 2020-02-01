import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DeviceService} from '../../core/services/device.service';
import {ConfigService} from '../../core/services/config.service';
import {AhemProperties} from '../../model/properties-model';
import {HomePageItem} from '../home-page-item/home-page-item.component';
import {DurationPipe} from 'ngx-moment';
import { SeoService } from '../../core/services/seo.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  properties: AhemProperties;
  showAd = false;

  @ViewChild('containerDiv', {static: true}) containerDiv: ElementRef;

  items: Array<HomePageItem> = [];
  constructor(public deviceService: DeviceService,
              private seoService: SeoService,
              private durationPipe: DurationPipe,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {
    seoService.setTitle('AHEM - an Ad-Hoc Disposable Temporary Email Address');
    seoService.updateMetaTag({name: 'description', content: 'AHEM - an Ad-Hoc Disposable Temporary Email Address. ' +
      'Ad-hoc - created on demand. Disposable - ' +
      'you can throw it away. ' +
      'Temporary - your emails will be delete automatically. Don\'t expose your real E-mail. Use AHEM to fight SPAM.'}
    );
    this.properties = ConfigService.properties;
  }



  ngOnInit() {
    this.createHomePageItems();
    this.showAd = this.seoService.shouldShowAd(1);
  }

  ngAfterViewInit() {
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        atOptions = {
                        'key' : '938d5c0fb87beb89eafe244059ced18c',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                    };
        document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.madcpms.com/938d5c0fb87beb89eafe244059ced18c/invoke.js"></scr' + 'ipt>');
        `;
    this._renderer2.appendChild(this.containerDiv, script);
    this.article.nativeElement.insertAdjacentHTML('afterend', script);
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
