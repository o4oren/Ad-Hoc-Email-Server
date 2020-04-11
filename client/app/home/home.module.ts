import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import { HomePageItemComponent } from './home-page-item/home-page-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MomentModule} from 'ngx-moment';
import { EmailCountComponent } from './email-count/email-count.component';
import {AdsenseModule} from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    AdsenseModule,
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
