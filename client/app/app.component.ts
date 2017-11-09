import { Component } from '@angular/core';
import {Angulartics2GoogleAnalytics} from "angulartics2";

@Component({
  selector: 'ahem-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AHEM - Ad Hoc Email Server';

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
