import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatIconModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  declarations: [FooterComponent, HeaderComponent]
})
export class CoreModule { }
