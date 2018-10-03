import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatListModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {MomentModule} from 'angular2-moment';
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import { HomePageItemComponent } from './home-page-item/home-page-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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
  declarations: [HomeComponent, HomePageItemComponent],
  exports: []
})
export class HomeModule { }
