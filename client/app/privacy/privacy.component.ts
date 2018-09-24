import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ahem-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle('AHEM - Privacy Policy');
   }

  ngOnInit() {
  }

}
