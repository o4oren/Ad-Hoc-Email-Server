import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SharedModule} from '../shared/shared.module';
import {MatListModule} from '@angular/material';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
