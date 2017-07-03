import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  stateCtrl: FormControl;
  options: any[] = ['aaaa','aabbb', 'aaadddd', 'bbbaaa', 'vvvccc', 'bbsrgr'];
  option;
  inputValue: string = '';
  constructor() {
    this.stateCtrl = new FormControl();
    this.option = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.option(name));
  }

  ngOnInit() {
  }

}
