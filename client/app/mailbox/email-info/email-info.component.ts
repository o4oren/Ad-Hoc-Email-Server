import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmailInfo} from '../../model/email-info-model';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.css']
})
export class EmailInfoComponent implements OnInit {

  @Input() emailInfo: EmailInfo;
  @Output() emailClicked: EventEmitter<EmailInfo> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.emailClicked.emit(this.emailInfo);
  }

}
