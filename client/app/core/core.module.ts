import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatIconModule, MatIconRegistry,
  MatInputModule,
  MatListModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {CoreRoutingModule} from './core-routing.module';
import {MomentModule} from 'angular2-moment';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Angulartics2Module} from 'angulartics2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AccountViewPageComponent} from '../account-view-page/account-view-page.component';
import {LandingPageComponent} from '../landing-page/landing-page.component';
import {EmailViewComponent} from '../email-view/email-view.component';
import {EmailInfoComponent} from '../email-info/email-info.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {HtmlSanitizerPipe} from './pipe/html-sanitizer.pipe';
import {ApiDocumentationComponent} from '../api-documentation/api-documentation.component';
import {TrimDomainPipe} from './pipe/trim-domain.pipe';
import {AccountSelectorComponent} from '../account-selector/account-selector.component';
import {AttachmentsComponent} from '../attachments/attachments.component';
import {DeviceService} from './device.service';
import {ApiService} from './api.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMeh, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


library.add(faMeh, faEnvelope, faEnvelopeOpen, faBars);

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AccountSelectorComponent,
    AccountViewPageComponent,
    EmailViewComponent,
    EmailInfoComponent,
    LandingPageComponent,
    HtmlSanitizerPipe,
    AttachmentsComponent,
    ApiDocumentationComponent,
    PageNotFoundComponent,
    TrimDomainPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    CoreRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RouterModule
  ],
  providers: [ApiService, MatIconRegistry, DeviceService],
})
export class CoreModule { }
