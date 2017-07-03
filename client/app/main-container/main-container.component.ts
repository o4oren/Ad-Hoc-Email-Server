import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit, OnDestroy {


  sub: Subscription;
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  filterAccounts(val: string) : any {
    return this.apiService.listAccountsAutoComplete(val);
  }

}
