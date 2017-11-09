import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatIconRegistry, MatInputModule, MatListModule,
  MatSidenavModule,
  MatToolbarModule

} from '@angular/material';
import { AppComponent } from './app.component';
import {ApiService} from "./api.service";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import {RouterModule, Routes} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';
import { AccountViewPageComponent } from './account-view-page/account-view-page.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { EmailInfoComponent } from './email-info/email-info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HtmlSanitizerPipe } from './pipe/html-sanitizer.pipe';
import { AttachmentsComponent } from './attachments/attachments.component';
import {MomentModule} from "angular2-moment";
import {Angulartics2GoogleAnalytics, Angulartics2Module} from "angulartics2";

const appRoutes: Routes = [
  { path: '', component:  LandingPageComponent},
  { path: ':account', component: AccountViewPageComponent},
  { path: ':account/:emailId', component: AccountViewPageComponent}
];

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
    AttachmentsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  providers: [ApiService, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
