import {Component, Input, OnInit} from '@angular/core';
import {DeviceService} from '../../../core/services/device.service';

@Component({
  selector: 'app-ad-tower',
  templateUrl: './ad-tower.component.html',
  styleUrls: ['./ad-tower.component.css']
})
export class AdTowerComponent implements OnInit {

  @Input() adSize = 'large';

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
  }

}
