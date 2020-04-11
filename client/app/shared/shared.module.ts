import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailboxSelectorComponent } from './mailbox-selector/mailbox-selector.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
    MailboxSelectorComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe,
    BannerComponent,
    ProgressComponent,
  ],
  exports: [
    MailboxSelectorComponent,
    BannerComponent,
    ProgressComponent,
    HtmlSanitizerPipe,
    TrimDomainPipe,
  ],
})
export class SharedModule { }
