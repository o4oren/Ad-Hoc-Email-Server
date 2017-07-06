import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {EmailInfo} from "../model/email-info-model";
import {EmailDetails} from "../model/email-details-model";

@Component({
  selector: 'app-account-view-page',
  templateUrl: './account-view-page.component.html',
  styleUrls: ['./account-view-page.component.css']
})
export class AccountViewPageComponent implements OnInit, OnDestroy {


  paramsSub: Subscription;
  account: string;
  emails: Array<EmailInfo>;
  selectedEmail: EmailInfo;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];

      this.getAccountEmails();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getAccountEmails(): any{
    this.apiService.listAccountsEmails(this.account).subscribe(emails => this.emails = emails);
  }

  selectEmail(clickedEmail:EmailInfo) {
    if(clickedEmail) {
      this.selectedEmail = clickedEmail;
      for(let e of this.emails) {
        e.timestamp == this.selectedEmail.timestamp ? e.isSelected = true : e.isSelected = false;
      }
    }
  }

}
