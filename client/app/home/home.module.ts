import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatListModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import { HomePageItemComponent } from './home-page-item/home-page-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MomentModule} from 'ngx-moment';
import { EmailCountComponent } from './email-count/email-count.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    FontAwesomeModule,
    MatIconModule,
    MomentModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, HomePageItemComponent, EmailCountComponent],
  exports: []
})
export class HomeModule { }
