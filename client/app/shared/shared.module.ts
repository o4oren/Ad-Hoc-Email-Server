import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HtmlSanitizerPipe} from './pipes/html-sanitizer.pipe';
import {TrimDomainPipe} from './pipes/trim-domain.pipe';
import { BannerComponent } from './banner/banner.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AccountSelectorComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe,
    BannerComponent,
    ProgressComponent,
  ],
  exports: [
    AccountSelectorComponent,
    BannerComponent,
    ProgressComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe
  ],
})
export class SharedModule { }
