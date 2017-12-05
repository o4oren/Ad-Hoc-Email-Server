import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {DeviceService} from "../device.service";

@Component({
  selector: 'ahem-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  properties: any = {};
  constructor(private apiService: ApiService, public deviceService: DeviceService) { }

  ngOnInit() {

  }

  onSelected() {}

}
