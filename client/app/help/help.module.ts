import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {SharedModule} from '../shared/shared.module';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

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
