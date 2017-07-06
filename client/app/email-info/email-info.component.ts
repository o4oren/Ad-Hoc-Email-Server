import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ahem-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss']
})
export class EmailInfoComponent implements OnInit {

  @Input() email: any;
  @Input() selectedEmail;
  @Output() emailClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.emailClicked.emit(this.email);
  }

}
