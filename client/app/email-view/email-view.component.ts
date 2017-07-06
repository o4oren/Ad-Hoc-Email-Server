import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {EmailInfo} from "../model/email-info-model";
import {EmailDetails} from "../model/email-details-model";

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css']
})
export class EmailViewComponent implements OnInit, OnDestroy {

  _email: EmailInfo;
  emailDetails: EmailDetails;
  paramsSub: Subscription;
  emailSub: Subscription;
  account: string;


  @Input()
  set email(email) {
    console.log(email);
    this.emailDetails = null;
    this._email = email;
    if(this.email) this.getEmailDetails();
  }

  get email(): any { return this._email; }

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getEmailDetails() {
    this.apiService.getEmailContent(this.account, this.email.timestamp).subscribe(result => this.emailDetails = result);
  }

}
