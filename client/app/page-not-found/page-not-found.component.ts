import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DeviceService} from "../device.service";

@Component({
  selector: 'ahem-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
  }
}
