import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatListModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {MomentModule} from 'angular2-moment';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    MatListModule,
    MatExpansionModule,
    MomentModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
