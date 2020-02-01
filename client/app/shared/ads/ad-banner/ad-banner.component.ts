import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../core/services/device.service';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {

  }

}
