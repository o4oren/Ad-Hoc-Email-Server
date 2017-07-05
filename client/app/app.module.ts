import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdToolbarModule, MdInputModule, MdAutocompleteModule, MdCardModule,
  MdListModule
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

const appRoutes: Routes = [
  { path: '', component:  MainPageComponent},
  { path: ':account', component: AccountViewPageComponent},
  { path: ':account/:timestamp', component: EmailViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    MainPageComponent,
    AccountViewPageComponent,
    EmailViewComponent

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
    ReactiveFormsModule,
    MdListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
