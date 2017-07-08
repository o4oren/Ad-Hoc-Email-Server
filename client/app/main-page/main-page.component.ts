import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  properties: any = {};
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProperties().subscribe(properties => this.properties = properties);
  }

  onSelected() {}


}
