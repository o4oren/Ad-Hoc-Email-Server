import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatListModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    MatListModule,
    MatExpansionModule,
    MomentModule,
    HomeRoutingModule
  ],
  declarations: [LandingPageComponent]
})
export class HomeModule { }
