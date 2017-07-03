import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements OnInit {
  autoCompleteControl: FormControl;
  accounts: string[];
  account ='';

  constructor(private apiService: ApiService) {
    this.autoCompleteControl = new FormControl();
  }

  ngOnInit(): void {
    // this.apiService.listAccountsAutoComplete('').subscribe(result => this.accounts = result);

    this.autoCompleteControl.valueChanges
      .debounceTime(400).subscribe(val => {
      this.filterAccounts(val).subscribe(result => this.accounts = result)
    })


  }


  filterAccounts(val: string) : any {
    return this.apiService.listAccountsAutoComplete(val);
  }

}
