import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule, MatTableModule} from '@angular/material';
import { FaqComponent } from './faq/faq.component';
import {MomentModule} from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MomentModule,
    HelpRoutingModule
  ],
  declarations: [ApiDocumentationComponent, FaqComponent]
})
export class HelpModule { }
