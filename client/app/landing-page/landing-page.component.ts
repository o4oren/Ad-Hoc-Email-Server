import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'ahem-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  properties: any = {};
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProperties().subscribe(properties => this.properties = properties);
  }

  onSelected() {}

}
