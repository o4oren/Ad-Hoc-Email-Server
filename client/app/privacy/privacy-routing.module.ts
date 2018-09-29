import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrivacyRoutingModule { }
