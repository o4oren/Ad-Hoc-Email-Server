import {Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {EmailDetails} from '../../model/email-details-model';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';
import {EmailInfo} from '../../model/email-info-model';

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
  account: string;


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
              private titleService: Title) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
      const emailId = params['emailId'];
      this.getEmailDetails();
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
      // this.isLoading = false;
      this.emailDetails = result;
      this.titleService.setTitle('AHEM - ' + this.account + ' - ' + this.emailDetails.subject);
      this.loading = false;
    });
  }

  deleteFile() {
    this.apiService.deleteEmail(this.account, this.emailDetails._id);
  }

}
