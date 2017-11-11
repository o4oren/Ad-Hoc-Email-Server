import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements OnInit {
  autoCompleteControl: FormControl;
  accounts: string[];
  @Input() selectedAccount ='';
  @Input() color = 'primary';

  constructor(private apiService: ApiService, private router: Router) {
    this.autoCompleteControl = new FormControl();
  }

  ngOnInit(): void {
    // this.apiService.listAccountsAutoComplete('').subscribe(result => this.accounts = result);

    this.autoCompleteControl.valueChanges
      .debounceTime(300).subscribe(val => {
      this.filterAccounts(val).subscribe(result => this.accounts = result)
    })


  }


  filterAccounts(val: string) : any {
    if (typeof val !== 'undefined' && val) {
      return this.apiService.listAccountsAutoComplete(val);
  } else {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  clickSubmit() {
    this.router.navigateByUrl('/account/' + this.selectedAccount.toLowerCase());
  }

}
