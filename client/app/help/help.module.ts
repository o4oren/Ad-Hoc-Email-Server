import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule, MatDividerModule, MatListModule, MatTableModule} from '@angular/material';
import { FaqComponent } from './faq/faq.component';
import {MomentModule} from 'ngx-moment';
import { AboutComponent } from './about/about.component';
import {AdsenseModule} from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MomentModule,
    MatListModule,
    AdsenseModule,
    HelpRoutingModule
  ],
  declarations: [ApiDocumentationComponent, FaqComponent, AboutComponent]
})
export class HelpModule { }
