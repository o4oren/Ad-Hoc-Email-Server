import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page-item',
  templateUrl: './home-page-item.component.html',
  styleUrls: ['./home-page-item.component.css']
})
export class HomePageItemComponent implements OnInit {

  @Input() homePageItem: HomePageItem;

  constructor() { }

  ngOnInit() {
  }

}

export interface HomePageItem {
  title: string;
  text: string;
  iconName: string;
  iconGroup: string;
}
