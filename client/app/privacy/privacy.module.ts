import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {MatCardModule, MatDividerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    PrivacyRoutingModule
  ],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyModule { }
