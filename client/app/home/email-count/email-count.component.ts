import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services/api.service';

@Component({
  selector: 'app-email-count',
  templateUrl: './email-count.component.html',
  styleUrls: ['./email-count.component.css']
})
export class EmailCountComponent implements OnInit {

  count: number;
  since: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getEmailCount().subscribe(emailCount => {
        this.count = emailCount.count;
        this.since = emailCount.since;
      }
    );
  }

}
