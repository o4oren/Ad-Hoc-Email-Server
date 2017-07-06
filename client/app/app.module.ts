import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdToolbarModule, MdInputModule, MdAutocompleteModule, MdCardModule,
  MdListModule, MdSidenavModule, MdIconRegistry, MdIconModule
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
import { HtmlCleanupPipe } from './pipe/html-cleanup.pipe';

const appRoutes: Routes = [
  { path: '', component:  MainPageComponent},
  { path: ':account', component: AccountViewPageComponent},
  { path: ':account/:timestamp', component: AccountViewPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    MainPageComponent,
    AccountViewPageComponent,
    EmailViewComponent,
    EmailInfoComponent,
    HtmlCleanupPipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdAutocompleteModule,
    MdCardModule,
    MdSidenavModule,
    ReactiveFormsModule,
    MdListModule,
    MdIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService, MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
