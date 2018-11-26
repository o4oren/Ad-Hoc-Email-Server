import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {EmailDetails} from '../../model/email-details-model';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';
import {EmailInfo} from '../../model/email-info-model';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailViewComponent implements OnInit, OnDestroy {

  _email: EmailInfo;
  emailDetails: EmailDetails;
  paramsSub: Subscription;
  mailbox: string;
  showAds = false;


 @Input() loading = false;


  @Input()
  set email(email) {
    console.log(email);
    this.emailDetails = null;
    this._email = email;
  }

  get email(): any { return this._email; }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private seoService: SeoService) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.mailbox = params['mailbox'];
      const emailId = params['emailId'];
      this.getEmailDetails();
    });

    this.showAds = this.seoService.shouldShowAd(0.8);
  }

  getSafeHtml(htmlString): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(htmlString);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getEmailDetails() {
    this.apiService.getEmailContent(this.mailbox, this.email.emailId).subscribe(result => {
      // this.isLoading = false;
      this.emailDetails = result;
      this.seoService.setTitle('AHEM - ' + this.mailbox + ' - ' + this.emailDetails.subject);
      this.loading = false;
    });
  }

  deleteFile() {
    this.apiService.deleteEmail(this.mailbox, this.emailDetails._id);
  }

}
