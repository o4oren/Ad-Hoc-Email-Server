import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import { DeviceService } from '../device.service';
import {Observable} from 'rxjs/internal/Observable';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements OnInit {
  autoCompleteControl: FormControl;
  accounts: string[];
  @Input() selectedAccount = '';
  @Input() color = 'primary';
  @Input() isInline = true;
  properties: any = {allowedDomains: ['']};

  constructor(public apiService: ApiService, private router: Router, public deviceService: DeviceService) {
    this.autoCompleteControl = new FormControl();
  }

  ngOnInit(): void {
    this.autoCompleteControl.valueChanges.
      pipe(debounceTime(300)).subscribe(val => {
      this.filterAccounts(val).subscribe(result => this.accounts = result);
    });

    this.properties = this.apiService.getProperties();
  }


  filterAccounts(val: string): any {
    if (this.properties.allowAutocomplete && typeof val !== 'undefined' && val) {
      return this.apiService.listAccountsAutoComplete(val);
  } else {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  clickSubmit() {
    this.router.navigateByUrl('/account/' + this.selectedAccount.toLowerCase().split('@')[0]);
  }

  generateEmail() {
    let email = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
      email += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.selectedAccount = email;
  }

}
