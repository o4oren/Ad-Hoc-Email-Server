import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, Inject, APP_ID, Optional } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatIconRegistry, MatInputModule, MatListModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule

} from '@angular/material';
import { AppComponent } from './app.component';
import {ApiService} from './api.service';
import {ReactiveFormsModule} from '@angular/forms';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AccountViewPageComponent } from './account-view-page/account-view-page.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { EmailInfoComponent } from './email-info/email-info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HtmlSanitizerPipe } from './pipe/html-sanitizer.pipe';
import { AttachmentsComponent } from './attachments/attachments.component';
import {MomentModule} from 'angular2-moment';
import { Angulartics2, Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { isPlatformBrowser, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';
import {DeviceService} from './device.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrimDomainPipe } from './trim-domain.pipe';
import { AppRoutingModule } from './app-routing.module';
import {FooterModule} from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    MainPageComponent,
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
    BrowserModule.withServerTransition({ appId: 'ahem' }),
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
    FooterModule,
    AppRoutingModule
  ],
  providers: [ApiService, MatIconRegistry, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
      const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId} with baseURI ${origin}`);
  }
}
