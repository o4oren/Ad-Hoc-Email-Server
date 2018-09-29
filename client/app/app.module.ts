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
import {ApiService} from './core/api.service';
import {ReactiveFormsModule} from '@angular/forms';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { AccountViewPageComponent } from './account-view-page/account-view-page.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { EmailInfoComponent } from './email-info/email-info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HtmlSanitizerPipe } from './core/pipe/html-sanitizer.pipe';
import { AttachmentsComponent } from './attachments/attachments.component';
import {MomentModule} from 'angular2-moment';
import { Angulartics2, Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { isPlatformBrowser, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';
import {DeviceService} from './core/device.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrimDomainPipe } from './core/pipe/trim-domain.pipe';
import { CoreRoutingModule } from './core/core-routing.module';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ahem' }),
    CoreModule
  ],
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
