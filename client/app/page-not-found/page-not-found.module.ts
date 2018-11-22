import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SharedModule} from '../shared/shared.module';
import {AdsenseModule} from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdsenseModule,
    PageNotFoundRoutingModule
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
