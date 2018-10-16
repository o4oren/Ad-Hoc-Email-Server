import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {DeviceService} from '../../core/services/device.service';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from '@angular/router';
import {ConfigService} from '../../core/services/config.service';

@Component({
  selector: 'app-mailbox-selector',
  templateUrl: './mailbox-selector.component.html',
  styleUrls: ['./mailbox-selector.component.css']
})
export class MailboxSelectorComponent implements OnInit {

  autoCompleteControl: FormControl;
  mailboxes: string[];
  @Input() selectedMailbox = '';
  @Input() color = 'accent';
  @Input() isInline = true;
  properties: any = {allowedDomains: ['']};

  constructor(public apiService: ApiService, private router: Router, public deviceService: DeviceService) {
    this.autoCompleteControl = new FormControl();
  }

  ngOnInit(): void {
    this.autoCompleteControl.valueChanges.
    pipe(debounceTime(300)).subscribe(val => {
      this.filterMailboxes(val).subscribe(result => this.mailboxes = result);
    });

    this.properties = ConfigService.properties;
  }


  filterMailboxes(val: string): any {
    if (this.properties.allowAutocomplete && typeof val !== 'undefined' && val) {
      return this.apiService.listMailboxesAutoComplete(val);
    } else {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  clickSubmit() {
    this.router.navigateByUrl('/mailbox/' + this.selectedMailbox.toLowerCase().split('@')[0]);
  }

  generateEmail() {
    let email = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
      email += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.selectedMailbox = email;
  }

}
