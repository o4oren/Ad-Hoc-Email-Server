import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailboxSelectorComponent } from './mailbox-selector/mailbox-selector.component';
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
import { AdBannerComponent } from './ads/ad-banner/ad-banner.component';
import { AdTowerComponent } from './ads/ad-tower/ad-tower.component';

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
    MailboxSelectorComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe,
    BannerComponent,
    ProgressComponent,
    AdBannerComponent,
    AdTowerComponent,
  ],
  exports: [
    MailboxSelectorComponent,
    BannerComponent,
    ProgressComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe,
    AdBannerComponent,
    AdTowerComponent
  ],
})
export class SharedModule { }
