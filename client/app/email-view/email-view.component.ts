import {Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ActivatedRoute} from '@angular/router';
import {EmailInfo} from '../model/email-info-model';
import {EmailDetails} from '../model/email-details-model';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {DeviceService} from "../core/device.service";
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'ahem-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailViewComponent implements OnInit, OnDestroy {

  _email: EmailInfo;
  emailDetails: EmailDetails;
  paramsSub: Subscription;
  account: string;


  @Input()
  set email(email) {
    console.log(email);
    this.emailDetails = null;
    this._email = email;
    if (this.email) {
      this.getEmailDetails();
    } else {
      this.emailDetails = null;
    }
  }

  get email(): any { return this._email; }

  constructor(private apiService: ApiService, private route: ActivatedRoute, private domSanitizer: DomSanitizer,
    public deviceService: DeviceService, private titleService: Title) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
    });
  }

  getSafeHtml(htmlString): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(htmlString);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getEmailDetails() {
    this.apiService.getEmailContent(this.account, this.email.emailId).subscribe(result => {
      this.emailDetails = result;
      this.titleService.setTitle('AHEM - ' + this.account + ' - ' + this.emailDetails.subject);
    });
  }

}
